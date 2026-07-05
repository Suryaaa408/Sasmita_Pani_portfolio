import { NextResponse } from "next/server";
import type { Project } from "@/data/content";
import { createProject, createProjectId, getProjects } from "@/lib/projects";

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Omit<Project, "id"> & { id?: string };
    const projects = await getProjects();
    const existingIds = projects.map((project) => project.id);
    const id = body.id?.trim() || createProjectId(body.title, existingIds);

    if (existingIds.includes(id)) {
      return NextResponse.json({ error: "A project with this ID already exists." }, { status: 409 });
    }

    const project: Project = {
      id,
      title: body.title.trim(),
      category: body.category,
      image: body.image.trim(),
      alt: body.alt.trim(),
      detailImages: body.detailImages,
      writeup: body.writeup.trim(),
      toolsUsed: body.toolsUsed,
    };

    const created = await createProject(project);

    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create project." }, { status: 500 });
  }
}
