import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // First, find the photo to get the file path
    const photo = await prisma.photo.findUnique({
      where: { id },
    });

    if (!photo) {
      return NextResponse.json({ message: 'Photo not found' }, { status: 404 });
    }

    // Delete the record from the database
    await prisma.photo.delete({
      where: { id },
    });

    // Then, delete the file from the filesystem
    try {
      const filePath = path.join(process.cwd(), 'public', photo.imageUrl);
      await fs.unlink(filePath);
    } catch (fileError) {
      // Log the error, but don't block the response.
      if (fileError instanceof Error) {
        console.warn(
          `Could not delete file for photo ${id}: ${fileError.message}`
        );
      } else {
        console.warn(
          `Could not delete file for photo ${id}: An unknown error occurred`
        );
      }
    }

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    if (error instanceof Error) {
      console.error('Delete photo error:', error.message);
      if ((error as any).cause?.code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE') {
        console.error('SSL Certificate verification failed');
      }
    }
    return NextResponse.json(
      { message: 'Failed to delete photo' },
      { status: 500 }
    );
  }
}
