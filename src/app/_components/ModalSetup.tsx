"use client";
import { useEffect } from "react";
import Modal from "react-modal";

export default function ModalSetup() {
  useEffect(() => {
    Modal.setAppElement("#app-root");
  }, []);

  return null;
}
