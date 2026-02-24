import {
  getCabin,
  getCabins,
} from "@/app/_lib/data-service";

import Reservation from "@/app/_components/Reservation";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";

export async function generateMetadata({ params }) {
  const { cabinId } = await params;
  const { name } = await getCabin(cabinId);
  return { title: `Cabin ${name}` };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
  return ids;
}
export default async function Page({ params }) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);
  

  return (
    <div className="max-w-6xl mx-auto mt-4 md:mt-8 px-4">
   
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-3xl md:text-5xl font-semibold text-center">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner/>}> 
          <Reservation cabin={cabin} />
        </Suspense>
        
      </div>
    </div>
  );
}
