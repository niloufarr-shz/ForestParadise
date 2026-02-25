"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function VerifySuccessPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => router.push("/auth/login"), 6000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div  className="text-center mt-10" >
      <h1 className="text-accent-500 text-[20px]" >Your email has been successfully verified!</h1>
      <p>Redirecting you to the login page...</p>
    </div>
  )
}