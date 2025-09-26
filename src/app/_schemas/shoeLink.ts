import z from "zod";

export const shoeLinkSchema = z.object({
  shoeId: z.string().min(1, "신발을 선택하세요."),
});
