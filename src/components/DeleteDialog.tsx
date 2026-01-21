import { createPortal } from "react-dom";
import { useAppContext, type Flashcards } from "../App";
import { useAllCardContext } from "../pages/AllCards";

type DeleteDialogProps = {
  id: Flashcards[number]["id"];
  onClose: () => void;
};

export default function DeleteDialog({ id, onClose }: DeleteDialogProps) {
  const { setFlashcards } = useAppContext();
  function deleteFlashcard() {
    setFlashcards((preFlashcard) => preFlashcard.filter((card) => card.id !== id));
  }

  const { setToastMessage, setToggleToast } = useAllCardContext();

  return createPortal(
    <div className="overlay" onClick={onClose}>
      <div className="delete-card-dialog" onClick={(e) => e.stopPropagation()}>
        <div>
          <div className="text-preset-2">Delete this card?</div>
          <div className="text-preset-4-regular">This action can’t be undone.</div>
        </div>
        <hr />

        <div className="create-card-container">
          <button className="btn-border text-preset-4-semibold" type="button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-primary text-preset-4-semibold"
            type="button"
            onClick={() => {
              deleteFlashcard();

              setToastMessage("Card Deleted");
              setToggleToast(true);
            }}>
            Delete Card
          </button>
        </div>
      </div>
    </div>,
    document.querySelector(".overlay-container")!,
  );
}
