"use client";

import * as s from "./RunCard.css";
import dayjs from "dayjs";
import { Run } from "@/model/Run";
import {
  MouseEvent as ReactMouseEvent,
  KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import type {} from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRun } from "../_lib/deleteRun";
import Modal from "react-modal";
import ConfirmModal from "@/app/_components/ConfirmModal";

type Props = {
  run: Run;
};

export default function RunCrad({ run }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const onClickdots = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setMenuOpen((v) => !v);
  };

  const deleteRuns = useMutation({
    mutationFn: deleteRun,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["runs"],
      });
      console.log("성공");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onClickDeleteRun = () => {
    deleteRuns.mutate(run.id);
  };

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <article className={s.card}>
      {/* <Modal
        isOpen={isOpen}
        className={s.modalContent}
        shouldCloseOnOverlayClick
        onRequestClose={closeModal}
      >
        <div>
          <h4>달리기 기록을 삭제하시겠습니까 ?</h4>
        </div>
        <div>
          <button onClick={() => setIsOpen(false)}>취소</button>
          <button onClick={onClickDeleteRun}>삭제</button>
        </div>
      </Modal> */}
      <ConfirmModal
        isOpen={isOpen}
        onCancel={closeModal}
        onConfirm={onClickDeleteRun}
        title="달리기 기록 삭제"
        description="이 작업은 되돌릴 수 없어요. 삭제하시겠습니까?"
        confirmLabel="삭제"
        cancelLabel="취소"
        contentClassName={s.modalContent} // 기존 스타일 계속 사용
        overlayClassName={s.modalOverlay}
      />
      <div className={s.inner}>
        <div className={s.headRow}>
          <div className={s.headRowLeft}>
            <div className={s.thumb}>
              <svg width="32" height="32" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M13.5 5.5c1.09 0 2-.92 2-2a2 2 0 0 0-2-2c-1.11 0-2 .88-2 2c0 1.08.89 2 2 2M9.89 19.38l1-4.38L13 17v6h2v-7.5l-2.11-2l.61-3A7.3 7.3 0 0 0 19 13v-2c-1.91 0-3.5-1-4.31-2.42l-1-1.58c-.4-.62-1-1-1.69-1c-.31 0-.5.08-.81.08L6 8.28V13h2V9.58l1.79-.7L8.19 17l-4.9-1l-.4 2z"
                />
              </svg>
            </div>
            <div>
              <h3 className={s.title}>{run.note}</h3>
              <p className={s.subtitle}>
                {dayjs(run.runAt).format("YYYY-MM-DD hh:mm")}
              </p>
            </div>
          </div>
          <div ref={menuRef} className={s.headRowRight}>
            <div className={s.dots} onClick={onClickdots}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M16 12a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2"
                />
              </svg>
            </div>
            <div
              className={clsx(s.menu, menuOpen && s.menuOpen)}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={s.item}
                onClick={() => {
                  setMenuOpen(false);
                  openModal();
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  width="20"
                  height="20"
                >
                  <path d="M12 20h9" strokeWidth="2" strokeLinecap="round" />
                  <path
                    d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                    strokeWidth="2"
                  />
                </svg>
                수정
              </button>
              <button
                className={s.item}
                onClick={() => {
                  setMenuOpen(false);
                  openModal();
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  width="20"
                  height="20"
                >
                  <path d="M3 6h18" strokeWidth="2" strokeLinecap="round" />
                  <path d="M8 6V4h8v2" strokeWidth="2" />
                  <path
                    d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"
                    strokeWidth="2"
                  />
                  <path d="M10 11v6M14 11v6" strokeWidth="2" />
                </svg>
                삭제
              </button>
            </div>
          </div>
        </div>

        <div className={s.metrics}>
          <div className={s.metric}>
            <div className={s.value}>{run.distance}</div>
            <div className={s.label}>Km</div>
          </div>
          <div className={s.metric}>
            <div className={s.value}>{run.pacePerKm}</div>
            <div className={s.label}>평균 페이스</div>
          </div>
          <div className={s.metric}>
            <div className={s.value}>{run.durationText}</div>
            <div className={s.label}>시간</div>
          </div>
        </div>
      </div>
    </article>
  );
}
