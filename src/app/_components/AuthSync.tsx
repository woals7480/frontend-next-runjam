"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserMe } from "@/app/(auth)/login/_lib/getUserMe";
import { useAuthStore } from "@/store/auth";

export default function AuthSync() {
  const authStore = useAuthStore();

  const { data, error } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getUserMe,
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) authStore.setUser(data);
    else if (error) {
      console.log(error);
      //   const e = error as HttpError;
      //   if (e.status === 401) clear();
    }
  }, [authStore, data, error]);

  return null;
}
