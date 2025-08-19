"use client";

import { ChangeEvent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { BreedType } from "@/types";
import { useBreedSearch } from "@/hooks";

export function SearchBox() {
  const [query, setQuery] = useState("");
  const { results, loading } = useBreedSearch(query);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value),
    [setQuery]
  );

  return (
    <section className="flex sm:justify-start justify-center">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search breeds..."
          value={query}
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />

        {loading && (
          <div className="absolute bg-background border mt-1 rounded-xl shadow-lg w-full h-60 overflow-y-auto flex justify-center items-center">
            <span>...Loading</span>
          </div>
        )}

        {results.length > 0 && !loading && (
          <ul className="absolute z-10 bg-background border mt-1 rounded-xl shadow-lg w-full max-h-60 overflow-y-auto">
            {results.map((breed) => (
              <SearchBoxItem key={breed.id} breed={breed} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function SearchBoxItem({ breed }: { breed: BreedType }) {
  const router = useRouter();

  const handleSelect = useCallback(
    (breed: BreedType) => router.push(`/${breed.petType}/${breed.id}`),
    [router]
  );
  return (
    <li
      key={`${breed.petType}-${breed.id}`}
      className="px-4 py-2 cursor-pointer hover:opacity-85"
      onClick={() => handleSelect(breed)}
    >
      {breed.name}
      <span className="text-sm text-gray-500"> ({breed.petType})</span>
    </li>
  );
}
