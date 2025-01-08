import { getAllPosts } from '@/utils/posts'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const posts = getAllPosts()
    return NextResponse.json(posts)
  } catch (_error) {
    console.error(_error)
    return NextResponse.json({ error: 'Failed to load posts' }, { status: 500 })
  }
} 