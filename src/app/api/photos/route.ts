import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all photos
export async function GET() {
  try {
    const photos = await prisma.photo.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(photos);
  } catch (error) {
    console.error('Failed to fetch photos:', error);
    return NextResponse.json({ message: 'Failed to fetch photos' }, { status: 500 });
  }
}
