"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 async function handleRegister(e) {
  e.preventDefault();
  setError("");
  setMessage("");

  // چک خالی نبودن فیلدها
  if (!password || !confirmPassword) {
    setError("Password and confirmation are required.");
    return;
  }

  // ✅ چک یکسان بودن دو رمز
  if (password !== confirmPassword) {
   setError("Passwords do not match.");
    return;
  }

  // حداقل طول رمز (اختیاری ولی پیشنهادی)
  if (password.length < 6) {
    setError("Password must be at least 6 characters long");
    return;
  }

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
     setMessage("Registration successful. Please verify your email before logging in.");
    } else if (data.error === "account_exists") {
      setError("An account with this email already exists.");
    } else {
      setError(data.error || "Something went wrong. Please try again.");
    }
  } catch (err) {
    setError("Network or server error. Please try again.");
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-md bg-primary-800  rounded-xl shadow-lg p-8 space-y-6">

        <h1 className="text-2xl font-bold text-center"> Register</h1>
{/* ثبت نام با گوگل و گیتهاب */}
     <div className="flex gap-3">
          <button
            onClick={() => signIn("google", { callbackUrl: "/account" })}
            className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg"
          >
            Login With Google
          </button>

          <button
            onClick={() => signIn("github", { callbackUrl: "/account" })}
            className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg"
          >
            Login With GitHub
          </button>
        </div>
           {/* جداکننده */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <form onSubmit={handleRegister} className="text-white space-y-4" dir="rtl">

         

          <input
            type="text"
            placeholder="name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg "
          />

          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg "
          />

          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg "
          />

          <input
            type="password"
            placeholder="repeat password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg "
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent-500 text-white py-2 rounded-lg hover:bg-accent-600 transition"
          >
            {loading ? "...Registering" : "Register"}
          </button>
          
        </form>

        {message && <p className="text-green-200 text-center">{message}</p>}
        {error && <p className="text-red-200 text-center">{error}</p>}
        <Link href="/auth/login" className="flex justify-center text-accent-500 underline"> Go to login page </Link>

      </div>
    </div>
  );
}
