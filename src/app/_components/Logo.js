import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <div className="flex items-center gap-6 z-10">
      <Link href="/" className="flex items-center gap-4">
        <Image
          src="/logo.png"
          height={60}
          width={60}
          alt="The Wild Oasis logo"
        />
        <span className="text-xl font-semibold text-primary-100">
          The Wild Oasis
        </span>
      </Link>

      
    </div>
  );
}

export default Logo;
