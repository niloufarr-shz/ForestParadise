// app/cabins/page.js

import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

export const dynamic = "force-dynamic";
//export const revalidate = 3600;
export const metadata = {
  title: "Cabins",
};

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const filter = params?.capacity ?? "all";

  return (
    <div className="px-2 md:px-10 py-10">
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Enjoy nature&#39;s beauty in your own little home away from
        home.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
