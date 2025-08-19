"use client";

import { useEffect, useState } from "react";
import { getSearchPets } from "@/lib/client-api";
import { BreedType } from "@/types";
import { useDebounce } from "./useDebounce";

export function useBreedSearch(query: string, debounceMs = 400) {
  const [results, setResults] = useState<BreedType[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, debounceMs);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await getSearchPets(debouncedQuery);
        setResults(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setResults([]);
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  return { results, loading };
}
