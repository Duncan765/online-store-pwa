import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const showAll = searchParams.get('all') === 'true';

    const session = await auth();
    const isAdmin = !!session;

    let result;
    if (showAll && isAdmin) {
      result = await sql`SELECT * FROM blog_posts ORDER BY created_at DESC`;
    } else {
      result = await sql`SELECT * FROM blog_posts WHERE published = true ORDER BY created_at DESC`;
    }

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, tags, published } = body;

    const result = await sql`
      INSERT INTO blog_posts (title, content, tags, published)
      VALUES (${title}, ${content}, ${tags}, ${published})
      RETURNING *
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, title, content, tags, published } = body;

    const result = await sql`
      UPDATE blog_posts
      SET title = ${title},
          content = ${content},
          tags = ${tags},
          published = ${published},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Blog post ID required' }, { status: 400 });
    }

    await sql`DELETE FROM blog_posts WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
