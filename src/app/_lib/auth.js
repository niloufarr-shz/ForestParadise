import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { supabase } from "@/app/_lib/supabase";
import { createGuest, getGuest } from "./data-service";
import jwt from "jsonwebtoken";

export function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    // Login با ایمیل و پسورد
    Credentials({
      credentials: {
        email: {},
        password: {},
        name: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { data: user } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .single();

        if (!user) {
          throw new Error("not_registered");
        }

        if (!user.is_verified) {
          throw new Error("not_verified");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isValid) {
          throw new Error("wrong_password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),

    // ورود با گوگل
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),

    // ورود با گیت‌هاب
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],

  // استفاده از JWT برای سشن
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  // کلید مخفی
  secret: process.env.AUTH_SECRET,

  callbacks: {
    // JWT callback
    async jwt({ token, user }) {
      // وقتی کاربر تازه login کرده
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email; // حتما ایمیل هم بذار
      }
      // در request های بعدی، فقط از token موجود استفاده می‌کنیم
      return token;
    },

    // Session callback
    async session({ session, token }) {
      if (!session?.user) return session; // اگر session.user وجود ندارد، برگردان

      try {
        const guest = await getGuest(session.user.email);
        if (guest) session.user.guestId = guest.id;
      } catch (err) {
        console.error("getGuest failed:", err);
      }

      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;

      return session;
    },

    // Authorized callback
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });
        return true;
      } catch {
        return false;
      }
    },
  },
});
