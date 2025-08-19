import "server-only";
import { getAllPets } from "../lib/api";
import { BreedType } from "../types";
import { BreedCard, SearchBox } from "@/components";

export default async function Home() {
  const pets = await getAllPets();

  return (
    <section>
      <SearchBox />
      <section className="mt-2 flex flex-wrap gap-5 sm:justify-start justify-center">
        {pets.map((pet: BreedType) => (
          <BreedCard key={`${pet?.id}_${pet?.name}`} pet={pet} />
        ))}
      </section>
    </section>
  );
}
