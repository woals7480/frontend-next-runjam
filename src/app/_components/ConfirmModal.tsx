// src/app/_components/ConfirmModal.tsx
"use client";

import React from "react";
import Modal from "react-modal";
import * as s from "./ConfirmModal.css";
import clsx from "clsx";

type ConfirmModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  contentClassName?: string;
  overlayClassName?: string;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
};

export default function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  title = "확인",
  description,
  confirmLabel = "확인",
  cancelLabel = "취소",
  contentClassName,
  overlayClassName,
  confirmButtonClassName,
  cancelButtonClassName,
}: ConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      shouldCloseOnOverlayClick
      aria={{ labelledby: "confirm-modal-title" }}
      className={clsx(s.content, contentClassName)}
      overlayClassName={clsx(s.overlay, overlayClassName)}
    >
      <div className={s.body}>
        <h4 id="confirm-modal-title" className={s.title}>
          {title}
        </h4>
        {description && <p className={s.description}>{description}</p>}
        <div className={s.actions}>
          <button
            type="button"
            onClick={onCancel}
            className={clsx(s.btn, cancelButtonClassName)}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={clsx(s.btn, s.btnPrimary, confirmButtonClassName)}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
