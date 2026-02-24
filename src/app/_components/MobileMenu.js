"use client";
import { useState, useEffect } from "react";

function MobileMenu({children}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // جلوگیری از اسکرول صفحه وقتی منو باز است
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <div>
      {/* دکمه منوی موبایل */}
      <button
        className="sm:hidden text-white focus:outline-none z-60 relative"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="تغییر وضعیت منو"
      >
        {isMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>
      {/* منوی کشویی موبایل (Overlay) */}
      {isMenuOpen && (
        <>
          {/* پس‌زمینه تیره (Backdrop) */}
          <div
            className="fixed inset-0 bg-black/50 z-55 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          {/* پنل کناری (Sidebar) */}
          <div className="fixed top-0 right-0 h-full w-64 overflow-x-hidden text-white z-60 transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl flex flex-col p-6">
            {/* دکمه بستن داخل منو */}
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* محتوای منو */}
            <div className="flex flex-col gap-6 text-lg">
            {children}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MobileMenu;
