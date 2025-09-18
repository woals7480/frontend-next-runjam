// src/app/_components/RunFormModal.tsx
"use client";

import Modal from "react-modal";
import * as s from "./RunFormModal.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

// 폼 스키마 (요구 포맷에 맞춤)
// - runAt: "YYYY-MM-DDTHH:mm" (input: datetime-local) → 전송 시 "YYYY-MM-DD HH:mm"으로 변환
// - distance: "NNN.nn" (문자열) 0.01~999.99, 소수 2자리까지 허용
// - duration: "HH:MM:SS"
// - note: 문자열(선택)
const formSchema = z.object({
  runAt: z
    .string()
    .min(1, "달린 날짜/시간을 입력해주세요.")
    .refine((v) => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(v), {
      message: "형식이 올바르지 않습니다. (예: 2025-09-05T12:23)",
    }),
  distance: z
    .string()
    .min(1, "거리(Km)를 입력해주세요.")
    .refine((v) => /^(\d{1,3})(\.\d{1,2})?$/.test(v), {
      message: "0.01 ~ 999.99 사이의 숫자(소수점 2자리)로 입력해주세요.",
    })
    .refine((v) => parseFloat(v) >= 0.01 && parseFloat(v) <= 999.99, {
      message: "0.01 ~ 999.99 사이로 입력해주세요.",
    }),
  duration: z
    .string()
    .min(1, "시간을 입력해주세요.")
    .refine((v) => /^\d{2}:\d{2}:\d{2}$/.test(v), {
      message: "형식은 HH:MM:SS 입니다. (예: 03:10:12)",
    }),
  note: z.string().optional(),
});

export type RunFormValues = z.infer<typeof formSchema>;

// 백엔드로 보낼 최종 페이로드 타입
export type CreateRunPayload = {
  runAt: string; // "YYYY-MM-DD HH:mm"
  distance: string; // "30.3" 같은 문자열
  duration: string; // "HH:MM:SS"
  note?: string;
};

function toApiPayload(values: RunFormValues): CreateRunPayload {
  // "YYYY-MM-DDTHH:mm" → "YYYY-MM-DD HH:mm"
  const runAt = values.runAt.replace("T", " ");
  return { ...values, runAt };
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateRunPayload) => Promise<void> | void; // react-query mutate 호출 등
  defaultValues?: Partial<RunFormValues>;
  submitting?: boolean; // 외부에서 로딩 표시 제어하고 싶을 때
  title?: string;
};

export default function RunFormModal({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
  submitting,
  title = "달리기 기록 등록",
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RunFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      runAt: "", // datetime-local용 기본값 (예: "2025-09-05T12:23")
      distance: "",
      duration: "",
      note: "",
      ...defaultValues,
    },
  });

  const submit = async (values: RunFormValues) => {
    await onSubmit(toApiPayload(values));
    reset(); // 성공 시 폼 초기화
    onClose(); // 모달 닫기
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
      aria={{ labelledby: "run-form-title" }}
      className={s.content}
      overlayClassName={s.overlay}
    >
      <div className={s.header} id="run-form-title">
        {title}
      </div>

      <form className={s.body} onSubmit={handleSubmit(submit)}>
        {/* runAt */}
        <div className={s.row}>
          <label className={s.label}>달린 날짜/시간</label>
          <input
            type="datetime-local"
            step="60" // 분 단위
            className={s.input}
            placeholder="2025-09-05T12:23"
            {...register("runAt")}
          />
          {errors.runAt && <p className={s.error}>{errors.runAt.message}</p>}
        </div>

        {/* distance */}
        <div className={s.row}>
          <label className={s.label}>거리(Km)</label>
          <input
            type="text"
            inputMode="decimal"
            className={s.input}
            placeholder="예: 30.3"
            {...register("distance")}
          />
          {errors.distance && (
            <p className={s.error}>{errors.distance.message}</p>
          )}
        </div>

        {/* duration */}
        <div className={s.row}>
          <label className={s.label}>시간 (HH:MM:SS)</label>
          <input
            type="text"
            className={s.input}
            placeholder="예: 03:10:12"
            {...register("duration")}
          />
          {errors.duration && (
            <p className={s.error}>{errors.duration.message}</p>
          )}
        </div>

        {/* note */}
        <div className={s.row}>
          <label className={s.label}>메모</label>
          <textarea
            className={s.textarea}
            placeholder="예: 장거리 달리기"
            {...register("note")}
          />
          {errors.note && <p className={s.error}>{errors.note.message}</p>}
        </div>

        <div className={s.footer}>
          <button type="button" onClick={onClose} className={s.btn}>
            취소
          </button>
          <button
            type="submit"
            className={clsx(s.btn, s.primary)}
            disabled={submitting || isSubmitting}
          >
            {submitting || isSubmitting ? "등록 중..." : "등록"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
