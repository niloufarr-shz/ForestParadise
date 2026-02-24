import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="px-4 py-4 md:px-8 md:py-5 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">

        <Logo />

        {/* دسکتاپ */}
        <div className="hidden sm:block">
          <Navigation />
        </div>

        {/* موبایل */}
        <div className="sm:hidden">
          <MobileMenu>
            <Navigation />
          </MobileMenu>
        </div>

      </div>
    </header>
  );
}
