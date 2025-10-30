import { NextResponse } from 'next/server';
import { initDatabase } from '@/lib/db';
import { seedDatabase } from '@/lib/seed';

export async function GET() {
  try {
    await initDatabase();
    await seedDatabase();
    return NextResponse.json({ success: true, message: 'Database initialized and seeded' });
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to initialize database' },
      { status: 500 }
    );
  }
}
