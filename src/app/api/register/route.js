import { supabase } from "@/app/_lib/supabase";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";

// تابع بررسی فرمت ایمیل
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

export async function POST(req) {
  try {
    const { firstName, lastName, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "ایمیل یا پسورد خالی است" },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "ایمیل وارد شده نامعتبر است" },
        { status: 400 },
      );
    }

    // چک ایمیل تکراری
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json({ error: "account_exists" }, { status: 400 });
    }

    // هش کردن پسورد
    const hashedPassword = await bcrypt.hash(password, 10);

    // ثبت کاربر جدید
    const { data: user, error } = await supabase
      .from("users")
      .insert({
        email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
        is_verified: false,
      })
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // تولید توکن تایید ایمیل
    const token = crypto.randomBytes(32).toString("hex");
    const expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 ساعت
    await supabase
      .from("email_verifications")
      .insert({ user_id: user.id, token, expires_at });

    // ارسال ایمیل واقعی
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const url = `${process.env.NEXT_PUBLIC_URL}/api/verify-email?token=${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "تایید ایمیل",
      html: `<p>برای تایید ایمیل روی لینک زیر کلیک کنید:</p>
             <a href="${url}">${url}</a>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "خطای سرور. لطفاً دوباره تلاش کنید." },
      { status: 500 },
    );
  }
}
