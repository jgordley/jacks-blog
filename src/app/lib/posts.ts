import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface Post {
  slug: string
  title: string
  date: string
  content: string
  excerpt?: string
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const postsDirectory = path.join(process.cwd(), '_posts')
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug,
      title: data.title,
      date: data.date,
      content,
      excerpt: data.excerpt || content.slice(0, 150) + '...'
    }
  } catch (error) {
    throw new Error(`Failed to load post: ${slug}`)
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), '_posts')
  const filenames = fs.readdirSync(postsDirectory)
  
  const posts = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace('.md', '')
      const fullPath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        slug,
        title: data.title,
        date: data.date,
        content,
        excerpt: data.excerpt || content.slice(0, 150) + '...'
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
  return posts
} 