import { NextResponse } from 'next/server'
import { getAdminSupabase, getServerSupabase, isAdmin } from '@/lib/supabase/serverClient'
import type { Project } from '@/lib/supabase/types'

export const dynamic = 'force-dynamic';

export async function GET() {
  const server = await getServerSupabase()
  const { data: sessionData, error: sessionError } = await server.auth.getUser()

  if (sessionError) {
    console.error("[Auth] Session error (GET ALL):", sessionError);
  }

  const userEmail = sessionData.user?.email ?? null;

  if (!isAdmin(userEmail)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const admin = getAdminSupabase()
  const { data, error } = await admin
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data as Project[])
}

