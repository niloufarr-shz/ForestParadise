"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

// مقدار اولیه همیشه آبجکت با from/to
const initialState = {
  from: undefined,
  to: undefined,
};

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);

  // resetRange هم همیشه به initialState برمی‌گرده
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context was used outside ReservationProvider");
  return context;
}

export { ReservationProvider, useReservation };