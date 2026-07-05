"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { ArrowLeft, Pencil, Plus, Trash2 } from "lucide-react";
import { projectCategories, type Project } from "@/data/content";

type ProjectFormState = {
  title: string;
  category: Exclude<(typeof projectCategories)[number], "All">;
  image: string;
  alt: string;
  detailImages: string;
  writeup: string;
  toolsUsed: string;
};

const emptyForm = (): ProjectFormState => ({
  title: "",
  category: "Character Modeling",
  image: "",
  alt: "",
  detailImages: "",
  writeup: "",
  toolsUsed: "",
});

const categoryOptions = projectCategories.filter(
  (category): category is Exclude<(typeof projectCategories)[number], "All"> => category !== "All",
);

function projectToForm(project: Project): ProjectFormState {
  return {
    title: project.title,
    category: project.category,
    image: project.image,
    alt: project.alt,
    detailImages: project.detailImages.join("\n"),
    writeup: project.writeup,
    toolsUsed: project.toolsUsed.join(", "),
  };
}

function formToPayload(form: ProjectFormState) {
  return {
    title: form.title,
    category: form.category,
    image: form.image,
    alt: form.alt,
    detailImages: form.detailImages
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
    writeup: form.writeup,
    toolsUsed: form.toolsUsed
      .split(",")
      .map((tool) => tool.trim())
      .filter(Boolean),
  };
}

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<ProjectFormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/projects");
      if (!response.ok) {
        throw new Error("Failed to load projects.");
      }
      const data = (await response.json()) as Project[];
      setProjects(data);
    } catch {
      setError("Could not load projects.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const resetForm = () => {
    setForm(emptyForm());
    setEditingId(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    const payload = formToPayload(form);

    try {
      const response = await fetch(editingId ? `/api/projects/${editingId}` : "/api/projects", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Failed to save project.");
      }

      setMessage(editingId ? "Project updated successfully." : "Project added successfully.");
      resetForm();
      await loadProjects();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setForm(projectToForm(project));
    setMessage(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this project?")) {
      return;
    }

    setError(null);
    setMessage(null);

    try {
      const response = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete project.");
      }

      if (editingId === id) {
        resetForm();
      }

      setMessage("Project deleted.");
      await loadProjects();
    } catch {
      setError("Could not delete project.");
    }
  };

  return (
    <div className="min-h-screen bg-beige text-ink">
      <header className="border-b border-maroon/12 bg-cream">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <div>
            <p className="label-caps">Admin</p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-maroon">Project Manager</h1>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-maroon transition-colors hover:text-maroon-soft"
          >
            <ArrowLeft size={15} aria-hidden />
            Back to site
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-10 px-5 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <section className="border border-maroon/12 bg-cream p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-ink">{editingId ? "Edit Project" : "Add New Project"}</h2>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-maroon"
              >
                Cancel edit
              </button>
            )}
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="label-caps">Title</span>
              <input
                required
                value={form.title}
                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                className="mt-2 w-full border border-maroon/18 bg-beige px-4 py-3 text-sm outline-none focus:border-maroon"
              />
            </label>

            <label className="block">
              <span className="label-caps">Category</span>
              <select
                value={form.category}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    category: event.target.value as ProjectFormState["category"],
                  }))
                }
                className="mt-2 w-full border border-maroon/18 bg-beige px-4 py-3 text-sm outline-none focus:border-maroon"
              >
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="label-caps">Cover image URL</span>
              <input
                required
                type="url"
                value={form.image}
                onChange={(event) => setForm((current) => ({ ...current, image: event.target.value }))}
                className="mt-2 w-full border border-maroon/18 bg-beige px-4 py-3 text-sm outline-none focus:border-maroon"
              />
            </label>

            <label className="block">
              <span className="label-caps">Image alt text</span>
              <input
                required
                value={form.alt}
                onChange={(event) => setForm((current) => ({ ...current, alt: event.target.value }))}
                className="mt-2 w-full border border-maroon/18 bg-beige px-4 py-3 text-sm outline-none focus:border-maroon"
              />
            </label>

            <label className="block">
              <span className="label-caps">Detail image URLs</span>
              <span className="mt-1 block text-sm text-muted">One URL per line</span>
              <textarea
                rows={4}
                value={form.detailImages}
                onChange={(event) => setForm((current) => ({ ...current, detailImages: event.target.value }))}
                className="mt-2 w-full border border-maroon/18 bg-beige px-4 py-3 text-sm outline-none focus:border-maroon"
              />
            </label>

            <label className="block">
              <span className="label-caps">Writeup</span>
              <textarea
                required
                rows={5}
                value={form.writeup}
                onChange={(event) => setForm((current) => ({ ...current, writeup: event.target.value }))}
                className="mt-2 w-full border border-maroon/18 bg-beige px-4 py-3 text-sm outline-none focus:border-maroon"
              />
            </label>

            <label className="block">
              <span className="label-caps">Tools used</span>
              <span className="mt-1 block text-sm text-muted">Comma separated, e.g. Blender, Maya, ZBrush</span>
              <input
                value={form.toolsUsed}
                onChange={(event) => setForm((current) => ({ ...current, toolsUsed: event.target.value }))}
                className="mt-2 w-full border border-maroon/18 bg-beige px-4 py-3 text-sm outline-none focus:border-maroon"
              />
            </label>

            {message && <p className="text-sm font-medium text-maroon">{message}</p>}
            {error && <p className="text-sm font-medium text-red-700">{error}</p>}

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 border border-maroon bg-maroon px-5 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-cream transition-opacity disabled:opacity-60"
            >
              {editingId ? <Pencil size={14} aria-hidden /> : <Plus size={14} aria-hidden />}
              {saving ? "Saving..." : editingId ? "Update project" : "Add project"}
            </button>
          </form>
        </section>

        <section>
          <h2 className="label-caps">Existing Projects</h2>
          {loading ? (
            <p className="mt-4 text-muted">Loading projects...</p>
          ) : projects.length === 0 ? (
            <p className="mt-4 text-muted">No projects yet.</p>
          ) : (
            <ul className="mt-5 space-y-4">
              {projects.map((project) => (
                <li key={project.id} className="border border-maroon/12 bg-cream p-4">
                  <div className="flex gap-4">
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden border border-maroon/12 bg-sand">
                      <Image
                        src={project.image}
                        alt={project.alt}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-ink">{project.title}</h3>
                      <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-maroon">
                        {project.category}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm text-muted">{project.writeup}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(project)}
                          className="inline-flex items-center gap-1 border border-maroon/18 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-maroon"
                        >
                          <Pencil size={12} aria-hidden />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(project.id)}
                          className="inline-flex items-center gap-1 border border-red-200 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-red-700"
                        >
                          <Trash2 size={12} aria-hidden />
                          Delete
                        </button>
                        <Link
                          href={`/work/${project.id}`}
                          className="inline-flex items-center border border-maroon/18 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-maroon"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
