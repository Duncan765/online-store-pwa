import { createPool } from '@vercel/postgres';

// Configure database connection using Replit's DATABASE_URL or Vercel's POSTGRES_URL
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL or POSTGRES_URL environment variable is required');
}

// Create a connection pool
const pool = createPool({
  connectionString
});

// Export sql tagged template
export const sql = pool.sql;

export async function initDatabase() {
  // Create tables if they don't exist
  await sql`
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      image_url TEXT,
      in_stock BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      tags TEXT,
      published BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

export async function getProducts(searchQuery?: string) {
  if (searchQuery) {
    const query = `%${searchQuery}%`;
    return await sql`
      SELECT * FROM products
      WHERE name ILIKE ${query} OR description ILIKE ${query}
      ORDER BY created_at DESC
    `;
  }
  return await sql`SELECT * FROM products ORDER BY created_at DESC`;
}

export async function getProduct(id: number) {
  return await sql`SELECT * FROM products WHERE id = ${id}`;
}

export async function getBlogPosts(published = true) {
  return await sql`
    SELECT * FROM blog_posts
    WHERE published = ${published}
    ORDER BY created_at DESC
  `;
}

export async function getBlogPost(id: number) {
  return await sql`SELECT * FROM blog_posts WHERE id = ${id}`;
}

export { sql };
