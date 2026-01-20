import { NextResponse } from "next/server";
import {
  getAdminSupabase,
  getServerSupabase,
  isAdmin,
} from "@/lib/supabase/serverClient";
import type { Project } from "@/lib/supabase/types";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const server = await getServerSupabase();
  const { data: sessionData, error: sessionError } = await server.auth.getUser();

  if (sessionError) {
    console.error("[Auth] Session error:", sessionError);
  }

  const userEmail = sessionData.user?.email ?? null;

  if (!isAdmin(userEmail)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  console.log("API PUT payload:", body);
  const admin = getAdminSupabase();
  const { data, error } = await admin
    .from("projects")
    .update(body)
    .eq("id", id)
    .select()
    .single();
  if (error) {
    console.error("Supabase update error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data as Project);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const server = await getServerSupabase();
  const { data: sessionData, error: sessionError } = await server.auth.getUser();

  if (sessionError) {
    console.error("[Auth] Session error (DELETE):", sessionError);
  }

  const userEmail = sessionData.user?.email ?? null;

  if (!isAdmin(userEmail)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const admin = getAdminSupabase();
  const { error } = await admin.from("projects").delete().eq("id", id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
