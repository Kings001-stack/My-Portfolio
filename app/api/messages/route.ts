import { NextResponse } from "next/server";
import {
  getAdminSupabase,
  getServerSupabase,
} from "@/lib/supabase/serverClient";
import type { Message } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

function isAdmin(email: string | null): boolean {
  const emails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
  return !!email && emails.includes(email);
}

export async function POST(req: Request) {
  const payload = await req.json();
  const admin = getAdminSupabase();
  const { data, error } = await admin
    .from("messages")
    .insert(payload)
    .select()
    .single();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data as Message, { status: 201 });
}

export async function GET() {
  const server = await getServerSupabase();
  const { data: sessionData } = await server.auth.getUser();
  if (!isAdmin(sessionData.user?.email ?? null)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const admin = getAdminSupabase();
  const { data, error } = await admin
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data as Message[]);
}
