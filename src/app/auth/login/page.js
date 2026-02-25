"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState(""); // نوع خطا
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setErrorType("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      setLoading(false);

      if (res?.error) {
        switch (res.error) {
          case "not_registered":
            setError("There is no user account with this email");
            setErrorType("not_registered");
            break;

          case "not_verified":
            setError("your email was not verified");
            setErrorType("not_verified");
            break;

          case "wrong_password":
          default:
            setError(
             "The Password is wrong (Have you verified yor email ? )" ,
            );
            setErrorType("wrong_password");
            break;
        }
        return;
      }

      // ورود موفق
      
      redirect("/account");
    } catch (err) {
      console.error(err);
      setError("خطای شبکه یا سرور. لطفاً دوباره تلاش کنید.");
      setErrorType("network");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  text-white p-4">
      <div className="w-full max-w-md bg-primary-800 rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center ">
         Login To The Account
        </h2>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => signIn("github", { callbackUrl: "/account" })}
            className="w-1/2 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition"
          >
           Login With GitHub
          </button>
          <button
            onClick={() => signIn("google", { callbackUrl: "/account" })}
            className="w-1/2 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition"
          >
           Login With Google
          </button>
        </div>
        {/* جداکننده */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm ">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
          <label > Email Address </label>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-gray-300 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400 text-black"
          />
          <label> Password </label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-gray-300 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400 text-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent-500 text-white py-2 rounded-lg hover:bg-accent-600 transition"
          >
            {loading ?" ...Lgging in" : "Login"}
          </button>
        </form>

        {/* پیام خطا */}
        {error && <p className="text-red-300 text-center text-sm md:text-[15px]">{error}</p>}

        {/* لینک‌ها و دکمه‌ها بر اساس نوع خطا */}
        <div className="flex flex-col space-y-2 mt-2 items-center">
          <a
            href="/auth/forgot-password"
            className="  hover:text-accent-600"
          >
           Reset Password
          </a>
          {errorType === "wrong_password" && (
            <a
              href="/auth/register"
              className=" hover:text-accent-600 text-center"
            >
             Dont have an account ? <br/> Please register first.
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
