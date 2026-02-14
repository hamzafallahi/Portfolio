import { prisma } from "@/lib/prisma";
import type { Project } from "@prisma/client";

export async function GET() {
  const owner = await prisma.person.findFirst();
  if (!owner) {
    return Response.json([]);
  }

  const projects = await prisma.project.findMany({
    where: { personId: owner.id },
    orderBy: { id: "asc" },
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
    await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.image,
        githubUrl: data.github,
        demoUrl: data.demo,
        linkedinPost: data.linkedinPost,
        featured: !!data.featured,
        tags: data.tags || [],
        personId: owner.id,
      },
    });

    return new Response("Created", { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
}