"use client";
import { FaUserCircle } from "react-icons/fa";
import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createBooking } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;
  const start_date = range?.from;
  const end_date = range?.to;

  const numNights =
    start_date && end_date ? differenceInDays(end_date, start_date) : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    start_date,
    end_date,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <div className="scale-[1.01] max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      {/* --- User info header --- */}
      <div className="bg-primary-800 mt-3 text-primary-300 px-4 sm:px-6 lg:px-8 py-4 rounded-t-md flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
        <p className="text-sm sm:text-base">Logged in as</p>
        <div className="flex gap-3 items-center">
          {user?.image ? (
            <img
              referrerPolicy="no-referrer"
              className="h-10 w-10 rounded-full object-cover"
              src={user.image}
              alt={user?.name}
            />
          ) : (
            <FaUserCircle className="h-10 w-10 text-accent-500" />
          )}
          <p className="text-sm sm:text-base  font-bold">{user?.name}</p>
        </div>
      </div>

      {/* --- Reservation form --- */}
      <form
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-6 sm:py-10 px-4 sm:px-6 lg:px-8 text-base sm:text-lg flex flex-col gap-5 rounded-b-md shadow-lg"
      >
        {/* --- Number of guests --- */}
        <div className="space-y-2">
          <label
            htmlFor="numGuests"
            className="block text-sm sm:text-base font-medium"
          >
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-3 sm:px-5 py-2 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
            required
          >
            <option value="">Select number of guests...</option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        {/* --- Observations --- */}
        <div className="space-y-2">
          <label
            htmlFor="observations"
            className="block text-sm sm:text-base font-medium"
          >
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-3 sm:px-5 py-2 sm:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
            placeholder="Any pets, allergies, special requirements, etc.?"
            rows={3}
          />
        </div>

        {/* --- Footer with total price & submit button --- */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mt-4">
          {!(start_date && end_date) ? (
            <p className="text-primary-300 text-sm sm:text-base">
              Start by selecting dates
            </p>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
              <div className="flex flex-col items-center sm:items-start">
                <p className="text-sm sm:text-base font-medium">
                  {numNights} night{numNights > 1 ? "s" : ""}
                </p>
                <p className="text-base sm:text-lg font-semibold">
                  Total: ${cabinPrice}
                </p>
              </div>
              <SubmitButton pendingLabel="Reserving..." className="w-full sm:w-auto">
                Reserve now
              </SubmitButton>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;