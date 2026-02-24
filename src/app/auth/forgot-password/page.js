"use client";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleForgot() {
    setMessage("");
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setMessage("The password recovery link has been sent to your email");
      } else {
        setMessage(data.error || "unknown error");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-md bg-primary-800 rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center "> forget your password ? </h1>

        <input
          type="email"
          placeholder="please enter yor email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400 "
        />

        <button
          onClick={handleForgot}
          className="w-full bg-accent-500 text-white py-2 rounded-lg hover:bg-accent-600 transition"
        >
         Send Recovery Link
        </button>

        {message && (
          <p className={`text-center ${message.includes ? "text-green-200" : "text-red-500"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
