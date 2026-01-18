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

export async function GET() {
  const supabase = getAdminSupabase();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data as Project[]);
}

export async function POST(req: Request) {
  const server = await getServerSupabase();
  const { data: sessionData } = await server.auth.getUser();
  if (!isAdmin(sessionData.user?.email ?? null)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const payload = await req.json();
  console.log("API POST payload:", payload);
  const admin = getAdminSupabase();
  const { data, error } = await admin
    .from("projects")
    .insert(payload)
    .select()
    .single();
  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data as Project, { status: 201 });
}
