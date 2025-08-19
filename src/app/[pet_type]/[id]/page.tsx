import "server-only";
import { NotFound } from "@/components";
import { getPet } from "@/lib/api";
import { PET_TYPE } from "@/types";
import Image from "next/image";
import Link from "next/link";

const EMPTY_TEXT = "none";

export default async function BreedPage({
  params,
}: {
  params: Promise<{ pet_type: string; id: string }>;
}) {
  const { pet_type, id } = await params;

  const { breedInfo = null, breedImages = [] } =
    (await getPet(pet_type as PET_TYPE, id)) ?? {};

  if (!breedInfo?.id) return <NotFound />;

  return (
    <>
      <header>
        <Link href="/" className="text-blue-600">
          ← Back
        </Link>
      </header>
      <section>
        <h1 className="text-3xl font-bold mt-4">
          {breedInfo?.name ?? EMPTY_TEXT}
        </h1>

        {breedInfo.temperament && (
          <p className="mt-2 text-gray-600">
            {breedInfo.temperament ?? EMPTY_TEXT}
          </p>
        )}
        <span>Life: {breedInfo?.life_span ?? EMPTY_TEXT}</span>
      </section>
      <section className="mt-10 flex gap-10 flex-wrap md:justify-start justify-center">
        {breedImages.map(({ id, url }) => (
          <Image
            key={id}
            src={url}
            alt={`${id}_image`}
            width={250}
            height={150}
            className="rounded-sm"
          />
        ))}
      </section>
    </>
  );
}
