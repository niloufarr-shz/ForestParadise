import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <div className="flex items-center gap-6 z-10">
      <Link href="/" className="flex items-center gap-4">
       
        <span className="text-xl font-semibold text-primary-100">
          The Wild Oasis
        </span>
         <Image
          src="/logo.png"
          height={45}
          width={48}
          alt="The Wild Oasis logo"
          className="md:w-12 h-12"
        />
      </Link>

      
    </div>
  );
}

export default Logo;
