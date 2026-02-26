"use client";

import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";

function SignOutButton() {
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/", 
    });
  };

  return (
    <button
      onClick={handleLogout}
      className='group relative py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full'
    >
      {/* آیکون */}
      <div className="flex-shrink-0">
        <FaSignOutAlt className='h-5 w-5 text-primary-600' />
      </div>

      {/* متن دسکتاپ */}
      <span className='hidden md:inline'>Sign out</span>

      {/* تولتیپ موبایل */}
      <span className="md:hidden absolute left-14 top-1/2 -translate-y-1/2 bg-primary-900 text-primary-100 text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
        Sign out
      </span>
    </button>
  );
}

export default SignOutButton;
