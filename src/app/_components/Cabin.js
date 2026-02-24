import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import TextExpander from "@/app/_components/TextExpander";

function Cabin({cabin}) {
    const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
    return (
          <div className="grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-8 md:gap-20 border border-primary-800 py-6 md:py-3 px-4 md:px-10 mb-12 md:mb-24">
        {/* Image Section */}
        <div className="relative w-full h-[300px] md:h-auto md:scale-[1.15] md:-translate-x-3 order-1 md:order-1">
          <Image
            fill
            className="object-cover"
            src={image}
            alt={`Cabin ${name}`}
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center order-2 md:order-2">
          <h3 className="text-accent-100 font-black text-4xl md:text-7xl mb-5 md:mb-5 text-left md:text-right md:bg-primary-950 md:p-6 md:pb-1 md:w-[150%] md:-translate-x-63.5">
            Cabin {name}
          </h3>

          <p className="text-base md:text-lg text-primary-300 mb-6 md:mb-10 leading-relaxed">
            <TextExpander>{description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
              <span className="text-base md:text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
              <span className="text-base md:text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
              <span className="text-base md:text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>
    )
}

export default Cabin
