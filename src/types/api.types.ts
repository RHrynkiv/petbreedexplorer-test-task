export enum PET_TYPE {
  DOG = "dog",
  CAT = "cat",
}
export interface BreedType {
  id: number;
  name: string;
  temperament: string;
  image: BreedTypeImage;
  petType: PET_TYPE;
  life_span: string;
}

export interface BreedTypeImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface GetPetTypes {
  breedInfo: BreedType;
  breedImages: BreedTypeImage[];
}
