import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "@/app/_components/DeleteReservation";
import Image from "next/image";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking , onDelete }) {
  const {
    id,
    guestId,
    start_date,
    end_date,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="flex flex-col md:flex-row border border-primary-800 rounded-lg overflow-hidden">

      {/* Image */}
      <div className="relative w-full h-48 md:h-32 md:w-32 md:aspect-square flex-shrink-0">
        <Image
          fill
          src={image}
          alt={`Cabin ${name}`}
          className="object-cover md:border-r border-primary-800"
        />
      </div>

      {/* Content */}
      <div className="flex-grow px-4 py-4 md:px-6 md:py-3 flex flex-col">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-lg md:text-xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>

          {isPast(new Date(start_date)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm w-fit">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm w-fit">
              upcoming
            </span>
          )}
        </div>

        <p className="text-sm md:text-lg text-primary-300 mt-2">
          {format(new Date(start_date), "EEE, MMM dd yyyy")} (
          {isToday(new Date(start_date))
            ? "Today"
            : formatDistanceFromNow(start_date)}
          ) &mdash; {format(new Date(end_date), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 mt-4 md:mt-auto items-start sm:items-baseline">

          <p className="text-lg md:text-xl font-semibold text-accent-400">
            ${totalPrice}
          </p>

          <div className="flex items-center gap-2 text-primary-300">
            <span>&bull;</span>
            <span>
              {numGuests} guest{numGuests > 1 && "s"}
            </span>
          </div>

          <p className="sm:ml-auto text-xs md:text-sm text-primary-400">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      {/* Actions */}
      {!isPast(new Date(start_date)) && (
        <div className="flex md:flex-col border-t md:border-t-0 md:border-l border-primary-800">

          <Link
            href={`/account/reservations/edit/${id}`}
            className="flex-1 md:grow group flex items-center justify-center gap-2 uppercase text-xs font-bold text-primary-300 border-r md:border-r-0 md:border-b border-primary-800 px-3 py-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
          >
            <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
            Edit
          </Link>

          <div className="flex-1  md:grow group flex items-center justify-center gap-2 uppercase text-xs font-bold text-primary-300 border-r md:border-r-0 md:border-b border-primary-800 px-3 py-3 hover:bg-accent-600 transition-colors hover:text-primary-900 ">
            <DeleteReservation bookingId={id} onDelete={onDelete} />
          </div>
        </div>
      )}
    </div>
  );
}
 

export default ReservationCard;
