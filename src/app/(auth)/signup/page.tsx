"use client";

import { signupSchema, SignupValues } from "@/app/_schemas/signupForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { postSignup } from "./_lib/postSignup";
import toast from "react-hot-toast";
import * as ui from "@/app/_styles/ui.css";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  // 이미 로그인되어 있다면 홈으로 보냄
  const { status: meStatus } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("unauth");
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  });
  useEffect(() => {
    if (meStatus === "success") router.replace("/");
  }, [meStatus, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({ resolver: zodResolver(signupSchema) });

  const signupMutation = useMutation({
    mutationFn: postSignup,
    onSuccess: () => {
      toast.success("회원가입이 완료되었습니다. 로그인해 주세요.");
      router.replace(`/login`);
    },
  });

  const onSubmit = (values: SignupValues) => {
    const payload = {
      email: values.email.trim(),
      password: values.password,
      nickname: values.nickname.trim(),
    };
    signupMutation.mutate(payload);
  };

  return (
    <main className={ui.page}>
      <div className={ui.card}>
        <h1 className={ui.h1}>회원가입</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "grid", gap: 12 }}
        >
          <label className={ui.label}>
            이메일
            <input
              type="email"
              autoComplete="email"
              className={ui.input}
              placeholder="you@example.com"
              {...register("email")}
            />
            {errors.email && (
              <span className={ui.errorText}>{errors.email.message}</span>
            )}
          </label>

          <label className={ui.label}>
            비밀번호
            <input
              type="password"
              autoComplete="new-password"
              className={ui.input}
              placeholder="영문/숫자 포함 8자 이상"
              {...register("password")}
            />
            {errors.password && (
              <span className={ui.errorText}>{errors.password.message}</span>
            )}
          </label>

          <label className={ui.label}>
            닉네임
            <input
              type="text"
              autoComplete="nickname"
              className={ui.input}
              placeholder="예: runjam-dev"
              {...register("nickname")}
            />
            {errors.nickname && (
              <span className={ui.errorText}>{errors.nickname.message}</span>
            )}
          </label>

          <button
            className={ui.btn}
            disabled={signupMutation.isPending || isSubmitting}
            type="submit"
          >
            {signupMutation.isPending || isSubmitting ? "가입 중…" : "회원가입"}
          </button>

          <p className={ui.errorText} style={{ visibility: "hidden" }}>
            _
          </p>
        </form>
      </div>
    </main>
  );
}
