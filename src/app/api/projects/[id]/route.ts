import { NextResponse } from "next/server";
import type { Project } from "@/data/content";
import { deleteProject, getProjectById, updateProject } from "@/lib/projects";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = (await request.json()) as Omit<Project, "id">;

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
    const saved = await updateProject(id, updated);

    if (!saved) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    return NextResponse.json(saved);
  } catch {
    return NextResponse.json({ error: "Failed to update project." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const deleted = await deleteProject(id);

    if (!deleted) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete project." }, { status: 500 });
  }
}
