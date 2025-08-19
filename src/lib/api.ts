import "server-only";

import { BreedType, BreedTypeImage, GetPetTypes, PET_TYPE } from "../types";
import { getRequiredEnv } from "../utils";

const DOG_API_URL = getRequiredEnv("DOG_API_URL");
const CAT_API_URL = getRequiredEnv("CAT_API_URL");

const DOG_API_KEY = getRequiredEnv("DOG_API_KEY");
const CAT_API_KEY = getRequiredEnv("CAT_API_KEY");

const requestOptionsGET = {
  method: "GET",
  next: { revalidate: 3600 },
};

async function fetchJson<T>(url: string, apiKey?: string): Promise<T> {
  const response = await fetch(url, {
    ...requestOptionsGET,
    headers: apiKey ? { "x-api-key": apiKey } : {},
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status} for ${url}`);
  }

  return response.json();
}

// Dog API
export async function getAllDogBreeds(): Promise<BreedType[]> {
  return fetchJson<BreedType[]>(`${DOG_API_URL}/breeds?limit=10`, DOG_API_KEY);
}

export async function getDogBreed(id: string): Promise<BreedType> {
  return fetchJson<BreedType>(`${DOG_API_URL}/breeds/${id}`, DOG_API_KEY);
}

export async function getDogBreedImages(id: string): Promise<BreedTypeImage[]> {
  return fetchJson<BreedTypeImage[]>(
    `${DOG_API_URL}/images/search/?limit=10&breed_ids=${id}`,
    DOG_API_KEY
  );
}

// Cat API
export async function getAllCatBreeds(): Promise<BreedType[]> {
  return fetchJson<BreedType[]>(`${CAT_API_URL}/breeds?limit=10`, CAT_API_KEY);
}

export async function getCatBreed(id: string): Promise<BreedType> {
  return fetchJson<BreedType>(`${CAT_API_URL}/breeds/${id}`, CAT_API_KEY);
}

export async function getCatBreedImages(id: string): Promise<BreedTypeImage[]> {
  return fetchJson<BreedTypeImage[]>(
    `${CAT_API_URL}/images/search/?limit=10&breed_ids=${id}`,
    CAT_API_KEY
  );
}

export async function getAllPets(): Promise<BreedType[]> {
  try {
    const [allDogs, allCats] = await Promise.all([
      getAllDogBreeds(),
      getAllCatBreeds(),
    ]);

    return [
      ...allDogs.map((dog) => ({ ...dog, petType: PET_TYPE.DOG })),
      ...allCats.map((cat) => ({ ...cat, petType: PET_TYPE.CAT })),
    ];
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getPet(
  type: PET_TYPE,
  id: string
): Promise<GetPetTypes | null | undefined> {
  const getPetBreedFn = type === PET_TYPE.DOG ? getDogBreed : getCatBreed;
  const getPetBreedImagesFn =
    type === PET_TYPE.DOG ? getDogBreedImages : getCatBreedImages;

  try {
    const [breedInfo, breedImages = []] = await Promise.all([
      getPetBreedFn(id),
      getPetBreedImagesFn(id),
    ]);
    return { breedInfo, breedImages };
  } catch (err) {
    console.error(err);
    return null;
  }
}
