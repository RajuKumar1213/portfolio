"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type CacheMode = "force-cache" | "no-store" | "reload" | "default";

interface ApiOptions {
  method?: Method;
  body?: any;
  cache?: CacheMode;
  auto?: boolean;
  debounce?: number;              // delay before calling API
  revalidateOnFocus?: boolean;    // SWR-style
  retry?: number;                 // retry attempts
  headers?: Record<string, string>;
}

export function useApiPro<T = any>(path: string, options: ApiOptions = {}) {
  const {
    method = "GET",
    body,
    auto = true,
    cache = "no-store",
    debounce = 0,
    revalidateOnFocus = true,
    retry = 1,
    headers = {},
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(auto);
  const [error, setError] = useState<string | null>(null);

  const controllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 🔥 Universal fetch function
  const executeFetch = useCallback(
    async (attempt = 0) => {
      try {
        setLoading(true);
        setError(null);

        controllerRef.current?.abort();
        const controller = new AbortController();
        controllerRef.current = controller;

        const token = window.localStorage.getItem("userToken"); // auto inject token

        const res = await fetch(path, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...headers,
          },
          ...(method !== "GET" ? { body: JSON.stringify(body) } : {}),
          cache,
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const json = await res.json();

        setData(json);
      } catch (err: any) {
        if (attempt < retry) return executeFetch(attempt + 1);
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [path, method, body, cache, retry, headers]
  );

  // 🧃 Debounce + auto-fetch
  useEffect(() => {
    if (!auto) return;
    if (debounce) {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => executeFetch(), debounce);
    } else {
      executeFetch();
    }
  }, [path, body]);

  // 🔁 Revalidate on focus like SWR
  useEffect(() => {
    if (!revalidateOnFocus) return;
    const handler = () => executeFetch();
    window.addEventListener("focus", handler);
    return () => window.removeEventListener("focus", handler);
  }, [executeFetch]);

  // 🔧 Expose helpers
  return {
    data,
    loading,
    error,
    refetch: executeFetch,
    mutate: (newData: T) => setData(newData), // instant UI updates
  };
}
