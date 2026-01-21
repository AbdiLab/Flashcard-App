import { createPortal } from "react-dom";
import iconCross from "../assets/images/icon-cross.svg";
import Form from "./Form";
import { type Flashcards } from "../App";

type EditDialogProps = {
  onClose: () => void;
  flashcard: Flashcards[number];
};

export default function EditDialog({ onClose, flashcard }: EditDialogProps) {
  return createPortal(
    <div className="overlay" onClick={onClose}>
      <div className="edit-card-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="text-preset-2">Edit your card</div>
        <Form defualtValue={flashcard} isEditMode={true} onClose={onClose} />
        <img src={iconCross} alt="icon-cross" onClick={onClose} />
      </div>
    </div>,
    document.querySelector(".container")!,
  );
}
