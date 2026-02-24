import { supabase } from "@/app/_lib/supabase"
import { NextResponse } from "next/server"

export async function GET(req) {
  const url = new URL(req.url)
  const token = url.searchParams.get("token")
  if (!token) return NextResponse.json({ error: "توکن وجود ندارد" }, { status: 400 })

  const { data: record } = await supabase
    .from("email_verifications")
    .select("*")
    .eq("token", token)
    .single()
  if (!record) return NextResponse.json({ error: "توکن نامعتبر است" }, { status: 400 })
  if (new Date(record.expires_at) < new Date()) return NextResponse.json({ error: "توکن منقضی شده" }, { status: 400 })

  await supabase.from("users").update({ is_verified: true }).eq("id", record.user_id)
  await supabase.from("email_verifications").delete().eq("id", record.id)

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/auth/verify-success`)
}
