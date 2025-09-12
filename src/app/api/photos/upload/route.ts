import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import path from 'path';
import fs from 'fs/promises';
import exifParser from 'exif-parser';
import { Buffer } from 'buffer';

async function parseExif(buffer: Buffer) {
    try {
        const parser = exifParser.create(buffer);
        return parser.parse();
    } catch (err) {
        console.warn(`Could not parse EXIF data:`, err);
        return null;
    }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('photo') as File | null;

    if (!file) {
      return NextResponse.json({ message: 'No photo uploaded.' }, { status: 400 });
    }

    const title = formData.get('title') as string | null;
    if (!title) {
      return NextResponse.json({ message: 'Title is required.' }, { status: 400 });
    }

    // Get other form data
    const description = formData.get('description') as string | null;
    const iso = formData.get('iso') as string | null;
    const shutterSpeed = formData.get('shutterSpeed') as string | null;
    const aperture = formData.get('aperture') as string | null;
    const focalLength = formData.get('focalLength') as string | null;

    // Process the file
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `photo-${uniqueSuffix}${path.extname(file.name)}`;
    const uploadPath = path.join(process.cwd(), 'public/uploads', filename);

    // Save the file
    await fs.writeFile(uploadPath, fileBuffer);

    // Extract EXIF data from buffer
    const exifData = await parseExif(fileBuffer);

    // Create record in database
    const newPhoto = await prisma.photo.create({
      data: {
        title,
        description: description,
        imageUrl: `/uploads/${filename}`, // Web-accessible path
        iso: exifData?.tags?.ISO?.toString() || iso,
        shutterSpeed: exifData?.tags?.ExposureTime?.toString() || shutterSpeed,
        aperture: exifData?.tags?.FNumber?.toString() || aperture,
        focalLength: exifData?.tags?.FocalLength?.toString() || focalLength,
      },
    });

    return NextResponse.json(newPhoto, { status: 201 });

  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ message: 'File upload failed' }, { status: 500 });
  }
}
