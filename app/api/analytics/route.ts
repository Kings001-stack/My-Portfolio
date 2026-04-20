import { NextResponse } from 'next/server'
import { getAdminSupabase } from '@/lib/supabase/serverClient'
import type { AnalyticsEvent } from '@/lib/supabase/types'

export async function POST(req: Request) {
  const payload = await req.json()
  const admin = getAdminSupabase()
  const { data, error } = await admin.from('analytics').insert(payload).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data as AnalyticsEvent, { status: 201 })
}

