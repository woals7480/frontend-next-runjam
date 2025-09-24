import { z } from "zod";

export const runFormSchema = z.object({
  // input: "YYYY-MM-DDTHH:mm"
  runAt: z
    .string()
    .min(1, "달린 날짜/시간을 입력해주세요.")
    .refine((v) => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(v), {
      message: "형식이 올바르지 않습니다. (예: 2025-09-05T12:23)",
    }),
  // 문자열로 유지 (백엔드가 "30.3"을 기대)
  distance: z
    .string()
    .min(1, "거리(Km)를 입력해주세요.")
    .refine((v) => /^(\d{1,3})(\.\d{1,2})?$/.test(v), {
      message: "0.01 ~ 999.99 사이의 숫자(소수점 2자리)로 입력해주세요.",
    })
    .refine(
      (v) => {
        const n = parseFloat(v);
        return !Number.isNaN(n) && n >= 0.01 && n <= 999.99;
      },
      { message: "0.01 ~ 999.99 사이로 입력해주세요." }
    ),
  duration: z
    .string()
    .min(1, "시간을 입력해주세요.")
    .refine((v) => /^\d{2}:\d{2}:\d{2}$/.test(v), {
      message: "형식은 HH:MM:SS 입니다. (예: 03:10:12)",
    }),
  note: z.string().optional(),
});

export type RunFormValues = z.infer<typeof runFormSchema>;
