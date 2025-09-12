import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Params {
  params: {
    id: string;
  };
}

// GET a single project by ID
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error(`Failed to fetch project ${params.id}:`, error);
    return NextResponse.json({ message: 'Failed to fetch project' }, { status: 500 });
  }
}

// PUT (update) a project by ID
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { title, description, imageUrl, repoUrl, liveUrl, tags } = await req.json();

    if (!title || !description) {
      return NextResponse.json({ message: 'Title and description are required' }, { status: 400 });
    }

    const updatedProject = await prisma.project.update({
      where: { id: params.id },
      data: {
        title,
        description,
        imageUrl,
        repoUrl,
        liveUrl,
        tags,
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error(`Failed to update project ${params.id}:`, error);
    return NextResponse.json({ message: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE a project by ID
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    await prisma.project.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    console.error(`Failed to delete project ${params.id}:`, error);
    return NextResponse.json({ message: 'Failed to delete project' }, { status: 500 });
  }
}
