import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all skills
export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Failed to fetch skills:', error);
    return NextResponse.json({ message: 'Failed to fetch skills' }, { status: 500 });
  }
}

// POST a new skill
export async function POST(req: NextRequest) {
  try {
    const { name, category, icon } = await req.json();

    if (!name || !category) {
      return NextResponse.json({ message: 'Name and category are required' }, { status: 400 });
    }

    const newSkill = await prisma.skill.create({
      data: {
        name,
        category,
        icon,
      },
    });

    return NextResponse.json(newSkill, { status: 201 });
  } catch (error) {
    console.error('Failed to create skill:', error);
    return NextResponse.json({ message: 'Failed to create skill' }, { status: 500 });
  }
}
