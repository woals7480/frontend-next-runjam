// src/app/shoes/new/_schema.ts
import { z } from "zod";

export const shoeSchema = z.object({
  brand: z
    .string()
    .min(1, "브랜드를 입력해주세요.")
    .max(50, "브랜드는 50자 이하여야 합니다."),
  model: z
    .string()
    .min(1, "모델명을 입력해주세요.")
    .max(50, "모델명은 50자 이하여야 합니다."),
  nickname: z
    .string()
    .max(50, "닉네임은 50자 이하여야 합니다.")
    .optional()
    .or(z.literal("")),
});

export type ShoeFormValues = z.infer<typeof shoeSchema>;
