// src/app/shoes/_components/ShoeForm.tsx
"use client";

import * as s from "./ShoeForm.css";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoeFormValues, shoeSchema } from "@/app/_schemas/shoeForm";

type Props = {
  mode: "create" | "edit";
  defaultValues?: Partial<ShoeFormValues>;
  submitting?: boolean;
  onSubmit: (values: ShoeFormValues) => Promise<void> | void;
  onCancel?: () => void;
};

export default function ShoeForm({
  mode,
  defaultValues,
  submitting,
  onSubmit,
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<ShoeFormValues>({
    resolver: zodResolver(shoeSchema),
    defaultValues: {
      brand: defaultValues?.brand ?? "",
      model: defaultValues?.model ?? "",
      nickname: defaultValues?.nickname ?? "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    setFocus("brand");
  }, [setFocus]);

  // defaultValues 변경 시 폼 업데이트(수정 페이지에서 데이터 로딩 후)
  useEffect(() => {
    if (defaultValues) {
      reset({
        brand: defaultValues.brand ?? "",
        model: defaultValues.model ?? "",
        nickname: defaultValues.nickname ?? "",
      });
    }
  }, [defaultValues, reset]);

  return (
    <form
      className={s.form}
      onSubmit={handleSubmit(async (values) => {
        const payload: ShoeFormValues = {
          brand: values.brand.trim(),
          model: values.model.trim(),
          nickname: values.nickname?.trim()
            ? values.nickname.trim()
            : undefined,
        };
        await onSubmit(payload);
      })}
      noValidate
    >
      <div className={s.field}>
        <label className={s.label} htmlFor="brand">
          브랜드{" "}
          <span aria-hidden="true" style={{ color: "#d14343" }}>
            *
          </span>
        </label>
        <input
          id="brand"
          className={s.input}
          placeholder="예) Nike, Asics, New Balance"
          {...register("brand")}
          aria-invalid={!!errors.brand}
          aria-describedby={errors.brand ? "brand-error" : undefined}
        />
        {errors.brand && (
          <p className={s.error} id="brand-error">
            {errors.brand.message}
          </p>
        )}
      </div>

      <div className={s.field}>
        <label className={s.label} htmlFor="model">
          모델명{" "}
          <span aria-hidden="true" style={{ color: "#d14343" }}>
            *
          </span>
        </label>
        <input
          id="model"
          className={s.input}
          placeholder="예) Pegasus 41, Novablast 4"
          {...register("model")}
          aria-invalid={!!errors.model}
          aria-describedby={errors.model ? "model-error" : undefined}
        />
        {errors.model && (
          <p className={s.error} id="model-error">
            {errors.model.message}
          </p>
        )}
      </div>

      <div className={s.field}>
        <label className={s.label} htmlFor="nickname">
          (선택) 닉네임
        </label>
        <input
          id="nickname"
          className={s.input}
          placeholder="예) 레이싱화, 데일리"
          {...register("nickname")}
          aria-invalid={!!errors.nickname}
          aria-describedby={errors.nickname ? "nickname-error" : undefined}
        />
        {errors.nickname && (
          <p className={s.error} id="nickname-error">
            {errors.nickname.message}
          </p>
        )}
      </div>

      <div className={s.actions}>
        <button
          type="button"
          className={s.button}
          onClick={onCancel}
          disabled={submitting}
        >
          취소
        </button>
        <button type="submit" className={s.primary} disabled={submitting}>
          {submitting
            ? mode === "edit"
              ? "수정 중..."
              : "등록 중..."
            : mode === "edit"
            ? "수정하기"
            : "등록하기"}
        </button>
      </div>
    </form>
  );
}
