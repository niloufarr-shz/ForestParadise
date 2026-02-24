import { supabase } from "@/app/_lib/supabase"
import { NextResponse } from "next/server"
import crypto from "crypto"
import nodemailer from "nodemailer"

export async function POST(req) {
  try {
    const { email } = await req.json()

    if (!email) 
      return NextResponse.json({ error: "ایمیل خالی است" }, { status: 400 })

    // چک اینکه کاربر وجود داره
    const { data: user } = await supabase.from("users").select("*").eq("email", email).single()
    if (!user) 
      return NextResponse.json({ error: "کاربری با این ایمیل ثبت نشده" }, { status: 400 })

    // تولید توکن و تاریخ انقضا (1 ساعت)
    const token = crypto.randomBytes(32).toString("hex")
    const expires_at = new Date(Date.now() + 1000 * 60 * 60)

    // ذخیره توکن در جدول password_resets
    await supabase.from("password_resets").insert({ user_id: user.id, token, expires_at })

    // ارسال ایمیل
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD
      },
    })

    const url = `${process.env.NEXT_PUBLIC_URL}/auth/reset-password?token=${token}`

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "بازیابی رمز عبور",
      html: `<p>برای تغییر رمز خود روی لینک زیر کلیک کنید:</p><a href="${url}">${url}</a>`,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
