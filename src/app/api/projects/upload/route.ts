import { NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/adminAuth";
import { getProjectStorageBucket, getSupabaseAdmin, slugify } from "@/lib/projects";

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);

const maxUploadSize = 100 * 1024 * 1024;

function extensionFromFile(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return extension ? `.${extension}` : "";
}

export async function POST(request: Request) {
  const authError = await requireAdminAuth();

  if (authError) {
    return authError;
  }

  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "A file is required." }, { status: 400 });
    }

    if (!allowedMimeTypes.has(file.type)) {
      return NextResponse.json({ error: "Only image and video uploads are supported." }, { status: 400 });
    }

    if (file.size > maxUploadSize) {
      return NextResponse.json({ error: "Uploads must be 100 MB or smaller." }, { status: 400 });
    }

    const folder = slugify(formData.get("folder")?.toString() ?? "projects") || "projects";
    const name = slugify(file.name.replace(/\.[^.]+$/, "")) || "upload";
    const path = `${folder}/${Date.now()}-${name}${extensionFromFile(file)}`;
    const bucket = getProjectStorageBucket();
    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: "31536000",
      contentType: file.type,
      upsert: false,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);

    return NextResponse.json({
      url: data.publicUrl,
      path,
      contentType: file.type,
    });
  } catch {
    return NextResponse.json({ error: "Failed to upload file." }, { status: 500 });
  }
}
