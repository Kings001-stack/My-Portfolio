import { NextResponse } from 'next/server'
import { getAdminSupabase, getServerSupabase, isAdmin } from '@/lib/supabase/serverClient'
import type { Profile } from '@/lib/supabase/types'

export const dynamic = 'force-dynamic';

export async function GET() {
  const admin = getAdminSupabase()
  const { data, error } = await admin
    .from('profile')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data as Profile | null)
}

export async function POST(req: Request) {
  const server = await getServerSupabase()
  const { data: sessionData, error: sessionError } = await server.auth.getUser()

  if (sessionError) {
    console.error("[Auth] Session error (POST PROFILE):", sessionError);
  }

  const userEmail = sessionData.user?.email ?? null;

  if (!isAdmin(userEmail)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const payload = await req.json()
  const admin = getAdminSupabase()
  const { data, error } = await admin
    .from('profile')
    .insert({ ...payload, updated_at: new Date().toISOString() })
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data as Profile, { status: 201 })
}

