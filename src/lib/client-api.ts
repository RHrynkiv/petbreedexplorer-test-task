import { BreedType, PET_TYPE } from "@/types";
import { shuffleArray } from "../utils";

const DOG_API_URL = process.env.NEXT_PUBLIC_DOG_API_URL;
const CAT_API_URL = process.env.NEXT_PUBLIC_CAT_API_URL;
const DOG_API_KEY = process.env.NEXT_PUBLIC_DOG_API_KEY;
const CAT_API_KEY = process.env.NEXT_PUBLIC_CAT_API_KEY;

async function fetchJson<T>(url: string, apiKey?: string): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
    headers: apiKey ? { "x-api-key": apiKey } : {},
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status} for ${url}`);
  }

  return response.json();
}

export async function searchDogBreed(q: string): Promise<BreedType[]> {
  return fetchJson<BreedType[]>(
    `${DOG_API_URL}/breeds/search?q=${q}`,
    DOG_API_KEY
  );
}

export async function searchCatBreed(q: string): Promise<BreedType[]> {
  return fetchJson<BreedType[]>(
    `${CAT_API_URL}/breeds/search?q=${q}`,
    CAT_API_KEY
  );
}

export async function getSearchPets(q: string): Promise<BreedType[]> {
  try {
    const [allDogs, allCats] = await Promise.all([
      searchDogBreed(q),
      searchCatBreed(q),
    ]);

    return shuffleArray([
      ...allDogs.map((dog) => ({ ...dog, petType: PET_TYPE.DOG })),
      ...allCats.map((cat) => ({ ...cat, petType: PET_TYPE.CAT })),
    ]);
  } catch (err) {
    console.error(err);
    return [];
  }
}
