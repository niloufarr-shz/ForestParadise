"use client";

import { SessionProvider } from "next-auth/react";
import { ReservationProvider } from "./_components/ReservationContext";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <ReservationProvider>
        {children}
      </ReservationProvider>
    </SessionProvider>
  );
}
