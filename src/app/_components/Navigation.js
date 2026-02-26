"use client"
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CiUser } from "react-icons/ci";
import Image from "next/image";
export default  function Navigation() {
  const { data: session } = useSession();
  return (
    <nav className="z-10 text-xl">
      <ul className="sm:flex sm:gap-10 sm:items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
       <li>
  {session?.user ? (
    <Link
      href="/account"
      className="hover:text-accent-400 transition-colors flex items-center gap-4"
    >
      {session.user.image ? (
        <Image
          className=" h-8 w-8 rounded-full  border-2 hover-none  border-accent-50"
          src={session.user.image}
          referrerPolicy="no-referrer"
          alt="User avatar"
        />
      ) : (
        <div className=" hidden sm:flex h-8 w-8 rounded-full  border-2 border-accent-50  items-center justify-center bg-neutral-700">
          <CiUser />
        </div>
      )}

      <span>Sign up</span>
    </Link>
  ) : (
    <Link
      href="/account"
      className="hover:text-accent-400 transition-colors"
    >
      Sign up
    </Link>
  )}
</li>

       
      </ul>
    </nav>
  );
}
