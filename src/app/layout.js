import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import "@/app/globals.css";
import { ReservationProvider } from "./_components/ReservationContext";
import { SessionProvider } from "next-auth/react";
import Providers from "./providers";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-josefin-sans",
});
export const metadata = {
  title: {
    template: "%s The Wild Oasis",
    default: "Welcome/The Wild Oasis",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950
        font-sans min-h-screen overflow-y-hidden flex flex-col text-white `}
      >
        <Providers>
          <Header />
          <div className="flex-1 grid  md:px-8 md:py-12">
            <main className="mx-auto max-w-7xl w-full">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
