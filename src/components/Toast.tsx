import { useEffect } from "react";
import iconCross from "../assets/images/icon-cross.svg";
import { createPortal } from "react-dom";

type ToastProps = {
  onClose: () => void;
  messageToast: string;
};

export default function Toast({ onClose, messageToast }: ToastProps) {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 2000);
  }, []);
  return createPortal(
    <div className="toast">
      <span className="text-preset-4-medium">{messageToast}</span>
      <img src={iconCross} alt="icon-cross" onClick={onClose} />
    </div>,
    document.querySelector(".container")!,
  );
}
