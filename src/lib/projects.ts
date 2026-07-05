import { promises as fs } from "fs";
import path from "path";
import type { Project } from "@/data/content";

const projectsFile = path.join(process.cwd(), "src/data/projects.json");

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function getProjects(): Promise<Project[]> {
  const data = await fs.readFile(projectsFile, "utf-8");
  return JSON.parse(data) as Project[];
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await fs.writeFile(projectsFile, `${JSON.stringify(projects, null, 2)}\n`, "utf-8");
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.id === id);
}

export function createProjectId(title: string, existingIds: string[]): string {
  const base = slugify(title) || "project";
  let id = base;
  let counter = 2;

  while (existingIds.includes(id)) {
    id = `${base}-${counter}`;
    counter += 1;
  }

  return id;
}
