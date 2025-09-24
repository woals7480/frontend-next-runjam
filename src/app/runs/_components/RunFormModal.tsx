// src/app/_components/RunFormModal.tsx
"use client";

import Modal from "react-modal";
import * as s from "./RunFormModal.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { runFormSchema, RunFormValues } from "@/app/_schemas/runForm";
import { formatRunAtForApi, formatRunAtForInput } from "@/utils/datetime";
import { RunInitial, RunPayload } from "../_types/runForm";

// ── 컴포넌트 ─────────────────────────────────────────────────────────────────
type Props = {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  onCreate?: (payload: RunPayload) => Promise<void> | void;
  onUpdate?: (id: string, payload: RunPayload) => Promise<void> | void;
  initial?: RunInitial;
  submitting?: boolean;
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
    resolver: zodResolver(runFormSchema),
    defaultValues: {
      runAt: initial?.runAt ? formatRunAtForInput(initial.runAt) : "",
      distance: initial?.distance ?? "",
      duration: initial?.duration ?? "",
      note: initial?.note ?? "",
    },
    values: {
      runAt: initial?.runAt ? formatRunAtForInput(initial.runAt) : "",
      distance: initial?.distance ?? "",
      duration: initial?.duration ?? "",
      note: initial?.note ?? "",
    },
  });

  const effectiveTitle =
    title ?? (mode === "edit" ? "달리기 기록 수정" : "달리기 기록 등록");
  const submitLabel = mode === "edit" ? "수정" : "등록";

  const onSubmit = async (values: RunFormValues) => {
    if (values.note?.length === 0) {
      values.note = undefined; // 빈 문자열인 경우 note를 undefined로 설정하여 서버에 보내지 않도록 함
    }

    const payload: RunPayload = {
      ...values,
      runAt: formatRunAtForApi(values.runAt),
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
