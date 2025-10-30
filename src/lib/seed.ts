import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export async function seedDatabase() {
  try {
    // Seed admin user (Duncan / @Dmwas001)
    const passwordHash = await bcrypt.hash('@Dmwas001', 10);

    await sql`
      INSERT INTO admins (username, password_hash)
      VALUES ('Duncan', ${passwordHash})
      ON CONFLICT (username) DO NOTHING
    `;

    // Seed sample products
    const products = [
      {
        name: 'Premium Leather Wallet',
        description: 'Handcrafted genuine leather wallet with RFID protection',
        price: 4500,
        image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
        in_stock: true
      },
      {
        name: 'Wireless Earbuds Pro',
        description: 'Premium noise-cancelling wireless earbuds with 24h battery life',
        price: 8900,
        image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800',
        in_stock: true
      },
      {
        name: 'Smart Watch Series X',
        description: 'Advanced fitness tracking with heart rate monitor and GPS',
        price: 12500,
        image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
        in_stock: false
      },
      {
        name: 'Designer Sunglasses',
        description: 'UV protection polarized lenses with titanium frame',
        price: 6700,
        image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
        in_stock: true
      },
      {
        name: 'Minimalist Backpack',
        description: 'Water-resistant laptop backpack with USB charging port',
        price: 5200,
        image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
        in_stock: true
      },
      {
        name: 'Portable Power Bank',
        description: '20000mAh fast charging power bank with LED display',
        price: 3400,
        image_url: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800',
        in_stock: false
      }
    ];

    for (const product of products) {
      await sql`
        INSERT INTO products (name, description, price, image_url, in_stock)
        VALUES (${product.name}, ${product.description}, ${product.price}, ${product.image_url}, ${product.in_stock})
      `;
    }

    // Seed sample blog posts
    const blogPosts = [
      {
        title: 'Welcome to Our Store',
        content: 'We are excited to announce the launch of our new online store! Browse our curated collection of premium products carefully selected for quality and style. Our mission is to bring you the best products at competitive prices with exceptional customer service.',
        tags: 'announcement, welcome',
        published: true
      },
      {
        title: 'New Arrivals This Week',
        content: 'Check out our latest additions to the store! This week we have restocked our popular wireless earbuds and added new designer sunglasses to our collection. Limited quantities available, so grab yours before they sell out!',
        tags: 'products, new-arrivals',
        published: true
      },
      {
        title: 'How to Choose the Perfect Wallet',
        content: 'Finding the right wallet is about balancing style, functionality, and durability. Our premium leather wallets are handcrafted from genuine leather and feature RFID protection to keep your cards safe. Learn more about what makes a quality wallet and how to care for it properly.',
        tags: 'guide, accessories',
        published: true
      }
    ];

    for (const post of blogPosts) {
      await sql`
        INSERT INTO blog_posts (title, content, tags, published)
        VALUES (${post.title}, ${post.content}, ${post.tags}, ${post.published})
      `;
    }

    console.log('✅ Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}
