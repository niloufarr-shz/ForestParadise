import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";
import { auth } from "@/app/_lib/auth";
async function Reservation({cabin}) {
   
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id)// استفاده از متغیر cabinId
  ]);
   const session = await auth();
  return (
    <div
      className=" border border-primary-800 
        min-h-100"
    >
      <DateSelector settings={settings} bookedDates={bookedDates} cabin={cabin} />
     {session?.user ?
      <ReservationForm cabin={cabin} user={session.user} />  :
      <LoginMessage/>
      }
    </div>
  );
}

export default Reservation;
