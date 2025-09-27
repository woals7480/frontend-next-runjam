// src/app/shoes/new/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ShoeForm from "../_components/ShoeForm";
import { createShoe } from "../_lib/createShoe";
import * as s from "./ShoeNew.css";

export default function NewShoePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createShoe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoes"] });
      router.replace(`/shoes`);
    },
  });

  return (
    <main className={s.page}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
        신발 등록
      </h1>
      <ShoeForm
        mode="create"
        submitting={createMutation.isPending}
        onSubmit={(values) => createMutation.mutate(values)}
        onCancel={() => router.back()}
      />
    </main>
  );
}
