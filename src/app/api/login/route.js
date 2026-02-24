import { supabase } from "@/app/_lib/supabase";
import { signToken } from "@/app/_lib/jwt";

export async function POST(req) {
  const { email, password } = await req.json();

  const { data: user } = await supabase.from("users").select("*").eq("email", email).single();
  if (!user) return new Response(JSON.stringify({ error: "کاربری با این ایمیل وجود ندارد" }), { status: 400 });
  if (user.password !== password) return new Response(JSON.stringify({ error: "رمز عبور اشتباه است" }), { status: 400 });
  if (!user.email_verified) return new Response(JSON.stringify({ error: "لطفاً ایمیل خود را تایید کنید" }), { status: 400 });

  const token = signToken({ id: user.id, email: user.email });
  return new Response(JSON.stringify({ token }), { status: 200 });
}
