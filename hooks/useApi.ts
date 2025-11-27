"use client";

import { useEffect, useState, useCallback } from "react";

type CacheMode = "force-cache" | "no-store" | "reload" | "default";

interface UseApiOptions {
  cache?: CacheMode;       // control Next.js cache behavior
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;              // optional body for POST/PUT
  auto?: boolean;          // auto fetch? default = true
}

export function useApi<T>(path: string, options: UseApiOptions = {}) {
  const {
    cache = "no-store",   // DEFAULT: always fresh data
    method = "GET",
    body = null,
    auto = true,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(auto);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(path, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        ...(method !== "GET" ? { body: JSON.stringify(body) } : {}),
        cache,
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [path, method, body, cache]);

  useEffect(() => {
    if (auto) fetchData();
  }, [fetchData, auto]);

  return { data, loading, error, refetch: fetchData };
}
