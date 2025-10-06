"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ui from "@/app/_styles/ui.css";
import { postLogin } from "./_lib/postLogin";
import { QueryClient } from "@tanstack/react-query";
import { getUserMe } from "./_lib/getUserMe";
import { User } from "@/model/User";
import { useAuthStore } from "@/store/auth";
import { LoginForm, LoginSchema } from "@/app/_schemas/loginForm";

export default function LoginPage() {
  const router = useRouter();
  const authStore = useAuthStore();
  const queryClient = new QueryClient();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (values: LoginForm) => {
    setServerError(null);
    try {
      await postLogin(values);
      await queryClient.prefetchQuery({
        queryKey: ["auth", "me"],
        queryFn: getUserMe,
        staleTime: Infinity,
      });
      const me = queryClient.getQueryData<User>(["auth", "me"]);

      if (me) {
        authStore.setUser(me);
      }
      router.replace("/");
    } catch (e) {
      setServerError(
        e instanceof Error
          ? e.message
          : "로그인 실패. 이메일/비밀번호를 확인해주세요."
      );
    }
  };

  return (
    <main className={ui.page}>
      <div className={ui.card}>
        <h1 className={ui.h1}>로그인</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "grid", gap: 12 }}
        >
          <label className={ui.label}>
            이메일
            <input
              className={ui.input}
              type="email"
              autoComplete="email"
              {...register("email")}
            />
            {errors.email && (
              <span className={ui.errorText}>{errors.email.message}</span>
            )}
          </label>
          <label className={ui.label}>
            비밀번호
            <input
              className={ui.input}
              type="password"
              autoComplete="current-password"
              {...register("password")}
            />
            {errors.password && (
              <span className={ui.errorText}>{errors.password.message}</span>
            )}
          </label>
          <button className={ui.btn} disabled={isSubmitting} type="submit">
            {isSubmitting ? "로그인 중…" : "로그인"}
          </button>
          {serverError && <p className={ui.errorText}>{serverError}</p>}
        </form>
      </div>
    </main>
  );
}
