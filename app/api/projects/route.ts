import { prisma } from "@/lib/prisma";
import type { Project } from "@prisma/client";

export async function GET() {
  const owner = await prisma.person.findFirst();
  if (!owner) {
    return Response.json([]);
  }

  const projects = await prisma.project.findMany({
    where: { personId: owner.id },
    orderBy: { sortOrder: "asc" },
  });

  const mapped = projects.map((proj: Project) => ({
    id: proj.id,
    title: proj.title,
    description: proj.description,
    image: proj.imageUrl,
    github: proj.githubUrl,
    demo: proj.demoUrl,
    linkedinPost: proj.linkedinPost,
    featured: proj.featured,
    tags: proj.tags,
    sortOrder: proj.sortOrder,
  }));

  return Response.json(mapped);
}

export async function POST(req: Request) {
  const data = await req.json();

  const owner = await prisma.person.findFirst();
  if (!owner) {
    return new Response("No owner found", { status: 404 });
  }

  try {
    // New items go to the end of their section: find max sortOrder for this featured status
    const isFeatured = !!data.featured;
    const maxSort = await prisma.project.aggregate({
      where: { personId: owner.id, featured: isFeatured },
      _max: { sortOrder: true },
    });
    const nextOrder = (maxSort._max.sortOrder ?? -1) + 1;

    await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.image,
        githubUrl: data.github,
        demoUrl: data.demo,
        linkedinPost: data.linkedinPost,
        featured: isFeatured,
        tags: data.tags || [],
        sortOrder: nextOrder,
        personId: owner.id,
      },
    });

    return new Response("Created", { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
}