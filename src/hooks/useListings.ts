import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";

export function useListings(query?: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query ? `?q=${encodeURIComponent(query)}` : "";
    apiGet<any[]>(`/api/listings${q}`)
      .then(setData)
      .finally(() => setLoading(false));
  }, [query]);

  return { data, loading };
}
