// src/app/_components/RunFormModal.tsx
"use client";

import Modal from "react-modal";
import * as s from "./RunFormModal.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

// ── 공용 스키마/타입 ───────────────────────────────────────────────────────────
const formSchema = z.object({
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

export type RunFormValues = z.infer<typeof formSchema>;

// API에 보낼 페이로드 (등록/수정 공용)
export type RunPayload = {
  runAt: string; // "YYYY-MM-DD HH:mm"
  distance: string; // "30.3"
  duration: string; // "HH:MM:SS"
  note?: string;
};

// ── 포맷 변환 유틸 ────────────────────────────────────────────────────────────
// input(datetime-local) → API ("YYYY-MM-DD HH:mm")
function toApiRunAt(inputValue: string) {
  // "2025-09-05T12:23" → "2025-09-05 12:23"
  return inputValue.replace("T", " ");
}

// API/엔티티의 runAt → input(datetime-local)
function toInputRunAt(apiValue: string) {
  // 가장 흔한 포맷: "2025-09-05 12:23"
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(apiValue)) {
    return apiValue.replace(" ", "T").slice(0, 16);
  }
  // 혹시 ISO가 온다면(예: "2025-09-05T12:23:00Z") 대략 처리
  if (apiValue.includes("T")) {
    return apiValue.slice(0, 16);
  }
  return "";
}

// ── 컴포넌트 ─────────────────────────────────────────────────────────────────
type Props = {
  isOpen: boolean;
  onClose: () => void;

  /** create | edit */
  mode: "create" | "edit";

  /** 등록 시 호출 */
  onCreate?: (payload: RunPayload) => Promise<void> | void;

  /** 수정 시 호출 (id는 initial.id에서 가져감) */
  onUpdate?: (id: string, payload: RunPayload) => Promise<void> | void;

  /** 편집용 초기값 (API 포맷 runAt: "YYYY-MM-DD HH:mm" 권장) */
  initial?: {
    id: string;
    runAt: string;
    distance: string;
    duration: string;
    note?: string;
  };

  /** 외부 로딩상태 바인딩 (react-query isPending 등) */
  submitting?: boolean;

  /** 모달 타이틀 커스터마이즈 */
  title?: string;
};

export default function RunFormModal({
  isOpen,
  onClose,
  mode,
  onCreate,
  onUpdate,
  initial,
  submitting,
  title,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RunFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      runAt: initial?.runAt ? toInputRunAt(initial.runAt) : "",
      distance: initial?.distance ?? "",
      duration: initial?.duration ?? "",
      note: initial?.note ?? "",
    },
    values: {
      runAt: initial?.runAt ? toInputRunAt(initial.runAt) : "",
      distance: initial?.distance ?? "",
      duration: initial?.duration ?? "",
      note: initial?.note ?? "",
    },
  });

  const effectiveTitle =
    title ?? (mode === "edit" ? "달리기 기록 수정" : "달리기 기록 등록");
  const submitLabel = mode === "edit" ? "수정" : "등록";

  const onSubmit = async (values: RunFormValues) => {
    const payload: RunPayload = {
      ...values,
      runAt: toApiRunAt(values.runAt),
    };

    if (mode === "edit") {
      if (!initial?.id) {
        console.error("수정 모드에는 initial.id가 필요합니다.");
        return;
      }
      await onUpdate?.(initial.id, payload);
    } else {
      await onCreate?.(payload);
    }

    reset();
    onClose();
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
        {effectiveTitle}
      </div>

      <form className={s.body} onSubmit={handleSubmit(onSubmit)}>
        {/* runAt */}
        <div className={s.row}>
          <label className={s.label}>달린 날짜/시간</label>
          <input
            type="datetime-local"
            step="60"
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
            {submitting || isSubmitting ? `${submitLabel} 중...` : submitLabel}
          </button>
        </div>
      </form>
    </Modal>
  );
}
