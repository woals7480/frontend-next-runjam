import z from "zod";

const passwordSchema = z.string().min(8, "비밀번호는 8자 이상이어야 합니다.");
//   .regex(/[A-Za-z]/, "영문자를 최소 1개 포함하세요.")
//   .regex(/[0-9]/, "숫자를 최소 1개 포함하세요.");

export const signupSchema = z.object({
  email: z.string().email("이메일 형식이 아닙니다."),
  password: passwordSchema,
  nickname: z
    .string()
    .min(2, "닉네임은 2자 이상")
    .max(20, "닉네임은 20자 이하"),
});

export type SignupValues = z.infer<typeof signupSchema>;
