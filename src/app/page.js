import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="fixed inset-0  flex items-center justify-center overflow-hidden ">
      
      <Image 
        src="/bg.png" 
        fill
        className="object-cover"
        alt="Mountains and forests with two cabins" 
      />
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl   lg:text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}