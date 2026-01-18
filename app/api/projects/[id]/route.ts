import { NextResponse } from "next/server";
import {
  getAdminSupabase,
  getServerSupabase,
} from "@/lib/supabase/serverClient";
import type { Project } from "@/lib/supabase/types";

function isAdmin(email: string | null): boolean {
  const emails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
  return !!email && emails.includes(email);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const server = await getServerSupabase();
  const { data: sessionData } = await server.auth.getUser();
  if (!isAdmin(sessionData.user?.email ?? null)) {
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
  const { data: sessionData } = await server.auth.getUser();
  if (!isAdmin(sessionData.user?.email ?? null)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const admin = getAdminSupabase();
  const { error } = await admin.from("projects").delete().eq("id", id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
