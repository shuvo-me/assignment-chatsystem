import { useQuery } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import type { User } from "@/types/chat";

interface ApiUser {
  _id: string;
  name: string;
  phone: string;
}

function normalizeUser(apiUser: ApiUser): User {
  return {
    id: apiUser._id,
    name: apiUser.name,
    phone: apiUser.phone,
    status: "offline",
  };
}

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);
  return debounced;
}

export const userService = {
  useSearchUsers(query: string) {
    const debouncedQuery = useDebouncedValue(query.trim(), 300);
    return useQuery({
      queryKey: ["users", "search", debouncedQuery],
      queryFn: async () => {
        try {
          const res = await axios.get("/api/users/search", {
            params: { q: debouncedQuery },
          });
          return (res.data as ApiUser[]).map(normalizeUser);
        } catch (err) {
          if (isAxiosError(err)) {
            throw new Error(
              err.response?.data?.message ??
                "Could not search users. Please try again.",
            );
          }
          throw new Error("Something went wrong. Please try again.");
        }
      },
      enabled: debouncedQuery.length >= 2,
      staleTime: 30 * 1000,
    });
  },
};
