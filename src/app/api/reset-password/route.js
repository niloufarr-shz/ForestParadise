import { supabase } from "@/app/_lib/supabase"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { token, password } = await req.json()

    if (!token || !password) 
      return NextResponse.json({ error: "توکن یا پسورد خالی است" }, { status: 400 })

    // پیدا کردن رکورد توکن
    const { data: record } = await supabase.from("password_resets").select("*").eq("token", token).single()
    if (!record) 
      return NextResponse.json({ error: "توکن نامعتبر است" }, { status: 400 })

    // چک تاریخ انقضا
    if (new Date(record.expires_at) < new Date()) 
      return NextResponse.json({ error: "توکن منقضی شده" }, { status: 400 })

    // هش کردن پسورد جدید و آپدیت کاربر
    const hashedPassword = await bcrypt.hash(password, 10)
    await supabase.from("users").update({ password: hashedPassword }).eq("id", record.user_id)

    // حذف توکن بعد از استفاده
    await supabase.from("password_resets").delete().eq("id", record.id)

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
