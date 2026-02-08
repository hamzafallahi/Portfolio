import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const person = await prisma.person.findFirst();

  if (!person) {
    return NextResponse.json({ message: "Person not found" }, { status: 404 });
  }

  const mappedPerson = {
    id: person.id,
    full_name: person.fullName,
    title: person.title,
    bio: person.bio,
    email: person.email,
    phone: person.phone,
    location: person.location,
    image_url: person.imageUrl,
    technology_tags: person.technologyTags,
    social_links: {
      github: person.github,
      linkedin: person.linkedin,
      facebook: person.facebook,
      codeforces: person.codeforces,
    },
  };

  return NextResponse.json(mappedPerson);
}

export async function PATCH(req: NextRequest) {
  const data = await req.json();

  const person = await prisma.person.findFirst();
  if (!person) {
    return NextResponse.json({ message: "Person not found" }, { status: 404 });
  }

  try {
    await prisma.person.update({
      where: { id: person.id },
      data: {
        fullName: data.full_name,
        title: data.title,
        bio: data.bio,
        email: data.email,
        phone: data.phone,
        location: data.location,
        imageUrl: data.image_url,
        technologyTags: data.technology_tags || [],
        github: data.social_links?.github,
        linkedin: data.social_links?.linkedin,
        facebook: data.social_links?.facebook,
        codeforces: data.social_links?.codeforces,
      },
    });

    return NextResponse.json({ message: "Person updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}