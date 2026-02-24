"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // فیلد تکرار پسورد
  const [message, setMessage] = useState("");

  async function handleReset() {
    setMessage("");

    // 🔹 چک کردن اینکه پسورد و تکرار پسورد یکسان باشند
    if (password !== confirmPassword) {
      setMessage("The password and its repeatation must be the same");
      return;
    }

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();

      if (data.success) {
        setMessage("Your password has been successfully changed ");
        setTimeout(() => router.push("/auth/login"), 2000);
      } else {
        setMessage(data.error || "unknown error");
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <p className="text-red-500 text-center"> Token is not valid ! .</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-md bg-primary-800  rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center ">Change Password</h1>

        {/* فیلد رمز عبور جدید */}
        <input
          type="password"
          placeholder="new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 "
        />

        {/* فیلد تکرار رمز عبور */}
        <input
          type="password"
          placeholder="repeat new passsword "
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 "
        />

        <button
          onClick={handleReset}
          className="w-full bg-accent-500 text-white py-2 rounded-lg hover:bg-accent-600 transition"
        >
          Change Password
        </button>

        {message && (
          <p
            className={`text-center ${
              message.includes("موفقیت") ? "text-green-200" : "text-red-200"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
