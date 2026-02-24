"use client"
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "@/app/_components/SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathName = usePathname();
  return (
    <nav className="border-r border-primary-900 w-16 md:w-48 transition-all duration-300">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              // group اضافه شده تا بتوانیم روی المنت‌های فرزند در حالت هاور اثر بگذاریم
              className={`group relative py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${pathName === link.href ? "bg-primary-900" : ""} `}
              href={link.href}
            >
              {/* آیکون همیشه نمایش داده می‌شود */}
              <div className="flex-shrink-0">{link.icon}</div>

              {/* متن: در موبایل مخفی و در دسکتاپ نمایش داده می‌شود */}
              <span className="hidden md:inline">{link.name}</span>

              {/* تولتیپ (Tooltip): فقط در موبایل و هنگام هاور نمایش داده می‌شود */}
              <span className="md:hidden absolute left-14 top-1/2 -translate-y-1/2 bg-primary-900 text-primary-100 text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                {link.name}
              </span>
            </Link>
          </li>
        ))}

        <li className="mt-auto">
          {/* دکمه خروج نیز باید با عرض منو هماهنگ شود */}
          <div className="md:hidden px-5 py-3">
            {/* اگر کامپوننت SignOutButton متن دارد، در موبایل مخفی کنید یا آیکون جداگانه اضافه کنید */}
            <SignOutButton />
          </div>
          <div className="hidden md:block px-5 py-3">
            <SignOutButton />
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
