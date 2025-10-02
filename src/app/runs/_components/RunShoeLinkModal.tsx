"use client";

import Modal from "react-modal";
import * as s from "./RunShoeLinkModal.css";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { ShoeModel } from "@/model/Shoe";
import { getShoes } from "@/app/shoes/_lib/getShoes";
import { linkRunToShoe } from "@/app/shoes/_lib/linkRunToShoe";
import { unlinkRunShoe } from "@/app/shoes/_lib/unlinkRunShoe";
import { RunMileage } from "@/model/Run";
import { ShoeLinkFormValues, shoeLinkSchema } from "@/app/_schemas/shoeLink";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  runId: string | null;
  initialMileage: RunMileage | null;
};

export default function RunShoeLinkModal({
  isOpen,
  onClose,
  runId,
  initialMileage,
}: Props) {
  const queryClient = useQueryClient();

  // 신발 목록
  const { data: shoes, isLoading: shoesLoading } = useQuery<ShoeModel[]>({
    queryKey: ["shoes"],
    queryFn: getShoes,
    enabled: isOpen,
    staleTime: Infinity,
  });

  const [keyword, setKeyword] = useState("");
  const filtered = useMemo(() => {
    if (!shoes) return [] as ShoeModel[];
    if (!keyword) return shoes;
    const kw = keyword.trim().toLowerCase();
    return shoes.filter((s) =>
      [s.brand, s.model, s.nickname ?? ""].some((t) =>
        t.toLowerCase().includes(kw)
      )
    );
  }, [shoes, keyword]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<ShoeLinkFormValues>({
    resolver: zodResolver(shoeLinkSchema),
    defaultValues: { shoeId: initialMileage?.shoe.id ?? "" },
  });

  // 모달 열릴 때 초기화
  useEffect(() => {
    if (isOpen) {
      reset({ shoeId: initialMileage?.shoe.id ?? "" });
      setKeyword("");
    }
  }, [isOpen, initialMileage?.shoe.id, reset]);

  // 연결/변경
  const linkMutation = useMutation({
    mutationFn: (v: ShoeLinkFormValues) =>
      linkRunToShoe({ id: v.shoeId, body: { runId: runId ?? "" } }),
    onSuccess: async (v) => {
      queryClient.invalidateQueries({ queryKey: ["runs"] });
      queryClient.invalidateQueries({ queryKey: ["shoes"] });
      queryClient.invalidateQueries({ queryKey: ["shoes", v.shoeId] });
      onClose();
    },
  });

  // 해제
  const unlinkMutation = useMutation({
    mutationFn: () => unlinkRunShoe({ mileageId: initialMileage?.id ?? "" }),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["runs"] });
      queryClient.invalidateQueries({ queryKey: ["shoes"] });
      queryClient.invalidateQueries({
        queryKey: ["shoes", initialMileage?.shoe.id],
      });
      onClose();
    },
  });

  const onSubmit = (values: ShoeLinkFormValues) => linkMutation.mutate(values);
  const selectedShoeId = watch("shoeId");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={s.modal}
      overlayClassName={s.overlay}
      shouldCloseOnOverlayClick={!isSubmitting}
    >
      <header className={s.header}>
        <h2 className={s.title}>달리기 기록에 신발 연결</h2>
        <button className={s.closeBtn} onClick={onClose} aria-label="닫기">
          ×
        </button>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.fieldRow}>
          <label className={s.label} htmlFor="shoe">
            신발 선택
          </label>
          <input
            type="text"
            placeholder="브랜드/모델/별칭 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className={s.search}
            aria-label="신발 검색"
          />
        </div>

        <div className={clsx(s.selectWrap, errors.shoeId && s.error)}>
          {shoesLoading ? (
            <div className={s.helper}>신발 목록을 불러오는 중…</div>
          ) : filtered.length === 0 ? (
            <div className={s.helper}>
              신발이 없습니다. 먼저 신발을 등록하세요.
            </div>
          ) : (
            <ul className={s.list} role="listbox" aria-label="신발 목록">
              {filtered.map((shoe) => {
                const id = `shoe-${shoe.id}`;
                const isSelected =
                  (selectedShoeId ?? initialMileage?.shoe.id) === shoe.id;
                return (
                  <li
                    key={shoe.id}
                    className={clsx(s.item, isSelected && s.itemSelected)}
                  >
                    <label htmlFor={id} className={s.itemLabel}>
                      <input
                        id={id}
                        type="radio"
                        value={shoe.id}
                        {...register("shoeId")}
                        onChange={(e) =>
                          setValue("shoeId", e.target.value, {
                            shouldValidate: true,
                          })
                        }
                      />
                      <span className={s.itemText}>
                        <strong className={s.brandModel}>
                          {shoe.brand} {shoe.model}
                        </strong>
                        {shoe.nickname ? (
                          <em className={s.nick}>({shoe.nickname})</em>
                        ) : null}
                        <span className={s.mileage}>
                          누적 {shoe.totalMileage.toFixed(2)} km
                        </span>
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
          {errors.shoeId && (
            <p className={s.errorText}>{errors.shoeId.message}</p>
          )}
        </div>

        <footer className={s.footer}>
          <button
            type="button"
            className={clsx(s.btn, s.btnGhost)}
            onClick={onClose}
            disabled={isSubmitting}
          >
            취소
          </button>
          {initialMileage?.shoe.id && (
            <button
              type="button"
              className={clsx(s.btn, s.btnWarn)}
              onClick={() => unlinkMutation.mutate()}
              disabled={unlinkMutation.isPending || isSubmitting}
              aria-label="현재 연결을 해제"
            >
              연결 해제
            </button>
          )}
          <button
            type="submit"
            className={clsx(s.btn, s.btnPrimary)}
            disabled={isSubmitting}
          >
            {initialMileage?.shoe.id ? "변경" : "연결"}
          </button>
        </footer>
      </form>
    </Modal>
  );
}
