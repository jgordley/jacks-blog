'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Post } from '@/types/post'

// This will be fetched from an API route
async function getPosts(): Promise<Post[]> {
  const res = await fetch('/api/posts')
  return res.json()
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    getPosts().then(setPosts)
  }, [])

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags || [])))

  const filteredPosts = selectedTags.length > 0
    ? posts.filter(post => post.tags?.some(tag => selectedTags.includes(tag)))
    : posts

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="w-full">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Filter by Tags</h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                selectedTags.includes(tag)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <article key={post.slug} className="border-b border-gray-200 pb-4">
              <Link href={`/blog/${post.slug}`} className="text-xl font-medium hover:underline">
                {post.title}
              </Link>
              <p className="text-gray-600 mt-1">{post.excerpt}</p>
              <div className="mt-2">
                {post.tags?.map((tag) => (
                  <span key={tag} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

