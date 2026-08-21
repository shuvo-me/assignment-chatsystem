import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import type { LoginPayload, User } from "@/types/chat";

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
    status: "online",
  };
}

export const authService = {
  useLogin() {
    return useMutation({
      mutationFn: async (payload: LoginPayload) => {
        try {
          const res = await axios.post("/api/auth/login", payload);
          return normalizeUser(res.data.user);
        } catch (err) {
          if (isAxiosError(err)) {
            throw new Error(
              err.response?.data?.message ??
                "Authentication failed. Please try again.",
            );
          }
          throw new Error("Something went wrong. Please try again.");
        }
      },
    });
  },

  useLogout() {
    return useMutation({
      mutationFn: () => axios.post("/api/auth/logout"),
    });
  },

  useMe() {
    return useQuery({
      queryKey: ["auth", "me"],
      queryFn: async () => {
        const res = await axios.get("/api/auth/me");
        return normalizeUser(res.data);
      },
      retry: false,
      staleTime: 5 * 60 * 1000,
    });
  },
};
