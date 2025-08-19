import { BreedType } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface PropsTypes {
  pet: BreedType;
}

export function BreedCard({ pet }: PropsTypes) {
  return (
    <Link
      href={`${pet?.petType}/${pet?.id}`}
      className="border border-gray-300 rounded-sm max-w-[250px] w-full p-0.5 hover:opacity-85"
    >
      <Image
        src={pet?.image?.url}
        alt={`${pet?.name}_image`}
        width={250}
        height={150}
        className="max-w-full max-h-[150px] rounded-sm"
      />
      <div className="flex flex-col  gap-0.5">
        <span className="">{pet?.name}</span>
      </div>
    </Link>
  );
}
