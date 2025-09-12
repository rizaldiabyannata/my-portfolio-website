import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';

// DELETE a photo by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  try {
    
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
        // The DB record is the source of truth, so if the file is already gone, it's okay.
        if (fileError instanceof Error) {
            console.warn(`Could not delete file for photo ${params.id}: ${fileError.message}`);
        } else {
            console.warn(`Could not delete file for photo ${params.id}: An unknown error occurred`);
        }
    }

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    console.error(`Failed to delete photo ${id}:`, error);
    return NextResponse.json({ message: 'Failed to delete photo' }, { status: 500 });
  }
}
