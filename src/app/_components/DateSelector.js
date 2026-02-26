"use client";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../../app/globals.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  if (!range?.from || !range?.to) return false;
  return datesArr.some((date) =>
    isWithinInterval(date, { start: range.from, end: range.to })
  );
}

function DateSelector({ settings, bookedDates, cabin }) {
  const { range, setRange, resetRange } = useReservation();

  // جلوگیری از undefined و انتخاب اشتباه
  const displayRange = isAlreadyBooked(range, bookedDates) ? { from: undefined, to: undefined } : range;

  const { regularPrice, discount } = cabin;
  const hasValidRange = displayRange?.from && displayRange?.to;

  const numNights = hasValidRange
    ? differenceInDays(displayRange.to, displayRange.from)
    : 0;

  const cabinPrice = hasValidRange ? numNights * (regularPrice - discount) : 0;

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        selected={displayRange}
        fromMonth={new Date()}
        toYear={new Date().getFullYear() + 5}
        numberOfMonths={2}
        captionLayout="dropdown"
        min={minBookingLength}
        max={maxBookingLength}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }

        // ⚡ اصلاح onSelect برای جلوگیری از undefined
        onSelect={(selectedRange) => {
          if (!selectedRange) {
            setRange({ from: undefined, to: undefined });
            return;
          }
          setRange(selectedRange);
        }}
      />

     <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-8 bg-accent-500 text-primary-800 py-4 gap-4 sm:gap-6 overflow-hidden">
  {/* --- قیمت و تعداد شب‌ها --- */}
  <div className="flex  sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
    <p className="flex gap-2 items-baseline">
      {discount > 0 ? (
        <>
          <span className="text-2xl">${regularPrice - discount}</span>
          <span className="line-through font-semibold text-primary-700">
            ${regularPrice}
          </span>
        </>
      ) : (
        <span className="text-2xl">${regularPrice}</span>
      )}
      <span className="text-sm sm:text-base">/night</span>
    </p>

    {numNights ? (
      <>
        <p className="bg-accent-600 px-3 py-1 sm:py-2 text-xl rounded-md flex items-center justify-center">
          <span>&times;</span> <span>{numNights} Nights </span>
        </p>
        <p className="text-base mt-2 sm:text-lg font-semibold">
          Total ${cabinPrice}
        </p>
      </>
    ) : null}
  </div>

  {/* --- دکمه Clear --- */}
  {range?.from || range?.to ? (
    <button
      className="border border-primary-800 py-2 px-4 text-sm font-semibold w-full sm:w-auto"
      onClick={resetRange}
    >
      Clear
    </button>
  ) : null}
</div>
    </div>
  );
}

export default DateSelector;