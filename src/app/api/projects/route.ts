import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json({ message: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST a new project
export async function POST(req: NextRequest) {
  try {
    const { title, description, imageUrl, repoUrl, liveUrl, tags } = await req.json();

    if (!title || !description) {
      return NextResponse.json({ message: 'Title and description are required' }, { status: 400 });
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl,
        repoUrl,
        liveUrl,
        tags, // Assuming tags is a comma-separated string
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Failed to create project:', error);
    return NextResponse.json({ message: 'Failed to create project' }, { status: 500 });
  }
}
