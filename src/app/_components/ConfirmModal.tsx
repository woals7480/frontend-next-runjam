// src/app/_components/ConfirmModal.tsx
"use client";

import React from "react";
import ReactModal from "react-modal";

type ConfirmModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  // 스타일을 외부에서 주입할 수 있게(예: vanilla-extract 클래스)
  contentClassName?: string;
  overlayClassName?: string;
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
}: ConfirmModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onCancel}
      shouldCloseOnOverlayClick
      aria={{ labelledby: "confirm-modal-title" }}
      className={contentClassName}
      overlayClassName={overlayClassName}
    >
      <div style={{ padding: 20, minWidth: 300 }}>
        <h4 id="confirm-modal-title" style={{ margin: 0 }}>
          {title}
        </h4>
        {description && <p style={{ marginTop: 12 }}>{description}</p>}
        <div
          style={{
            marginTop: 16,
            display: "flex",
            gap: 8,
            justifyContent: "flex-end",
          }}
        >
          <button type="button" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </ReactModal>
  );
}
