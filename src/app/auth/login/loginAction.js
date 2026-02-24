"use server"; // می‌گوید این تابع روی سرور اجرا می‌شود

import { supabase } from "@/app/_lib/supabase";
import { signToken } from "@/app/_lib/jwt";

export async function loginAction(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!user) throw new Error("not_registered");
  if (user.password !== password) throw new Error("wrong_password");
  if (!user.email_verified) throw new Error("not_verified");

  const token = signToken({ id: user.id, email: user.email });
  return token;
}
