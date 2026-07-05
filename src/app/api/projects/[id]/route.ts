import { NextResponse } from "next/server";
import type { Project } from "@/data/content";
import { getProjects, saveProjects } from "@/lib/projects";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const projects = await getProjects();
  const project = projects.find((item) => item.id === id);

  if (!project) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = (await request.json()) as Omit<Project, "id">;
    const projects = await getProjects();
    const index = projects.findIndex((item) => item.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    const updated: Project = {
      id,
      title: body.title.trim(),
      category: body.category,
      image: body.image.trim(),
      alt: body.alt.trim(),
      detailImages: body.detailImages,
      writeup: body.writeup.trim(),
      toolsUsed: body.toolsUsed,
    };

    projects[index] = updated;
    await saveProjects(projects);

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update project." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const projects = await getProjects();
    const nextProjects = projects.filter((item) => item.id !== id);

    if (nextProjects.length === projects.length) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    await saveProjects(nextProjects);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete project." }, { status: 500 });
  }
}
