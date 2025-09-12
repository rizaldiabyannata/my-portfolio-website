import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET a single skill by ID
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const skill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!skill) {
      return NextResponse.json({ message: 'Skill not found' }, { status: 404 });
    }

    return NextResponse.json(skill);
  } catch (error) {
    console.error(`Failed to fetch skill ${id}:`, error);
    return NextResponse.json(
      { message: 'Failed to fetch skill' },
      { status: 500 }
    );
  }
}

// PUT (update) a skill by ID
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const { name, category, icon } = await req.json();

    if (!name || !category) {
      return NextResponse.json(
        { message: 'Name and category are required' },
        { status: 400 }
      );
    }

    const updatedSkill = await prisma.skill.update({
      where: { id },
      data: {
        name,
        category,
        icon,
      },
    });

    return NextResponse.json(updatedSkill);
  } catch (error) {
    console.error(`Failed to update skill ${id}:`, error);
    return NextResponse.json(
      { message: 'Failed to update skill' },
      { status: 500 }
    );
  }
}

// DELETE a skill by ID
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    await prisma.skill.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    console.error(`Failed to delete skill ${id}:`, error);
    return NextResponse.json(
      { message: 'Failed to delete skill' },
      { status: 500 }
    );
  }
}
