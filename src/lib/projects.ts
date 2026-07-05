import { promises as fs } from "fs";
import path from "path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Project } from "@/data/content";

const projectsFile = path.join(process.cwd(), "src/data/projects.json");
const projectsTable = "projects";

type ProjectRow = {
  id: string;
  title: string;
  category: Project["category"];
  image: string;
  alt: string;
  detail_images: string[] | null;
  writeup: string;
  tools_used: string[] | null;
  created_at?: string;
};

let supabaseAdmin: SupabaseClient | null | undefined;

export function getSupabaseAdmin() {
  if (supabaseAdmin !== undefined) {
    return supabaseAdmin;
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  supabaseAdmin =
    supabaseUrl && supabaseServiceRoleKey
      ? createClient(supabaseUrl, supabaseServiceRoleKey, {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        })
      : null;

  return supabaseAdmin;
}

export function getProjectStorageBucket() {
  return process.env.SUPABASE_STORAGE_BUCKET ?? "project-media";
}

function rowToProject(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    image: row.image,
    alt: row.alt,
    detailImages: row.detail_images ?? [],
    writeup: row.writeup,
    toolsUsed: row.tools_used ?? [],
  };
}

function projectToRow(project: Project): ProjectRow {
  return {
    id: project.id,
    title: project.title,
    category: project.category,
    image: project.image,
    alt: project.alt,
    detail_images: project.detailImages,
    writeup: project.writeup,
    tools_used: project.toolsUsed,
  };
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function getProjects(): Promise<Project[]> {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { data, error } = await supabase
      .from(projectsTable)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (data as ProjectRow[]).map(rowToProject);
  }

  const data = await fs.readFile(projectsFile, "utf-8");
  return JSON.parse(data) as Project[];
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await fs.writeFile(projectsFile, `${JSON.stringify(projects, null, 2)}\n`, "utf-8");
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { data, error } = await supabase.from(projectsTable).select("*").eq("id", id).maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data ? rowToProject(data as ProjectRow) : undefined;
  }

  const projects = await getProjects();
  return projects.find((project) => project.id === id);
}

export async function createProject(project: Project): Promise<Project> {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { data, error } = await supabase.from(projectsTable).insert(projectToRow(project)).select("*").single();

    if (error) {
      throw new Error(error.message);
    }

    return rowToProject(data as ProjectRow);
  }

  const projects = await getProjects();
  projects.unshift(project);
  await saveProjects(projects);
  return project;
}

export async function updateProject(id: string, project: Project): Promise<Project | undefined> {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { data, error } = await supabase
      .from(projectsTable)
      .update(projectToRow(project))
      .eq("id", id)
      .select("*")
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data ? rowToProject(data as ProjectRow) : undefined;
  }

  const projects = await getProjects();
  const index = projects.findIndex((item) => item.id === id);

  if (index === -1) {
    return undefined;
  }

  projects[index] = project;
  await saveProjects(projects);
  return project;
}

export async function deleteProject(id: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    const existing = await getProjectById(id);

    if (!existing) {
      return false;
    }

    const { error } = await supabase.from(projectsTable).delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return true;
  }

  const projects = await getProjects();
  const nextProjects = projects.filter((item) => item.id !== id);

  if (nextProjects.length === projects.length) {
    return false;
  }

  await saveProjects(nextProjects);
  return true;
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
