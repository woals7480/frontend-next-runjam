// src/app/shoes/[id]/edit/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ShoeForm from "../../_components/ShoeForm";
import { getShoeDetail } from "../../_lib/getShoeDetail";
import { ShoeDetailModel } from "@/model/Shoe";
import { updateShoe } from "../../_lib/updateShoe";
import { ShoePayload } from "../../_types/shoeForm";

export default function EditShoePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<ShoeDetailModel>({
    queryKey: ["shoe", id],
    queryFn: () => getShoeDetail(id as string),
    staleTime: Infinity,
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: (payload: Partial<ShoePayload>) => updateShoe(id, payload),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["shoes"] });
      queryClient.invalidateQueries({ queryKey: ["shoes", id] });
      router.replace(`/shoes/${updated?.id ?? id}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (isLoading) {
    return (
      <main
        style={{ maxWidth: 640, margin: "0 auto", padding: "24px 20px 48px" }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
          신발 수정
        </h1>
        <p>불러오는 중…</p>
      </main>
    );
  }

  return (
    <main
      style={{ maxWidth: 640, margin: "0 auto", padding: "24px 20px 48px" }}
    >
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
        신발 수정
      </h1>
      <ShoeForm
        mode="edit"
        defaultValues={{
          brand: data?.brand ?? "",
          model: data?.model ?? "",
          nickname: data?.nickname ?? "",
        }}
        submitting={updateMutation.isPending}
        onSubmit={(values) => updateMutation.mutate(values)}
        onCancel={() => router.back()}
      />
    </main>
  );
}
