import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";

export function useCategories() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet<any[]>("/api/categories")
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
