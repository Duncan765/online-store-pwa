import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');

    let result;
    if (search) {
      const query = `%${search}%`;
      result = await sql`
        SELECT * FROM products
        WHERE name ILIKE ${query} OR description ILIKE ${query}
        ORDER BY created_at DESC
      `;
    } else {
      result = await sql`SELECT * FROM products ORDER BY created_at DESC`;
    }

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, price, image_url, in_stock } = body;

    const result = await sql`
      INSERT INTO products (name, description, price, image_url, in_stock)
      VALUES (${name}, ${description}, ${price}, ${image_url}, ${in_stock})
      RETURNING *
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, name, description, price, image_url, in_stock } = body;

    const result = await sql`
      UPDATE products
      SET name = ${name},
          description = ${description},
          price = ${price},
          image_url = ${image_url},
          in_stock = ${in_stock},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
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
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }

    await sql`DELETE FROM products WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
