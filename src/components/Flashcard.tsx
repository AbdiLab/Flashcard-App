import iconMenu from "../assets/images/icon-menu.svg";
import iconMastered from "../assets/images/icon-mastered.svg";
import iconEdit from "../assets/images/icon-edit.svg";
import iconDelete from "../assets/images/icon-delete.svg";

import { useEffect, useState } from "react";
import DeleteDialog from "./DeleteDialog";
import type { Flashcards } from "../App";
import EditDialog from "./EditDialog";

type FlashcardProps = {
  card: Flashcards[number];
};

export default function Flashcard({ card }: FlashcardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen === false) return;
    function handleEvent(e: Event) {
      if (e.target instanceof Element) {
        if (!e.target.closest(".menu-container")) {
          setIsMenuOpen(false);
        }
      }
    }

    document.addEventListener("click", handleEvent);

    return () => {
      document.removeEventListener("click", handleEvent);
    };
  }, [isMenuOpen]);

  return (
    <div className="flashcard">
      <div className="question-container text-preset-3">{card.question}</div>
      <div className="flashcard-answered-container text-preset-5">
        <div className="flashcard-answer-hint">Answer:</div>
        <div>{card.answer}</div>

        {isMenuOpen && (
          <div className="card-dropdown">
            <button className="dropwdown-item" onClick={() => setIsEditDialogOpen(true)}>
              <img src={iconEdit} alt="icon-edit" />
              <span className="text-preset-5">Edit</span>
            </button>
            <hr />
            <button className="dropwdown-item" onClick={() => setIsDeleteDialogOpen(true)}>
              <img src={iconDelete} alt="icon-delete" />
              <span className="text-preset-5">Delete</span>
            </button>
          </div>
        )}
      </div>
      <div className="footer">
        <div className="tag-container">
          <div className="flashcard-tag text-preset-6">{card.category}</div>
        </div>
        <div className="prgoress-bar-container">
          {card.knownCount === 5 ? (
            <div className="mastered">
              <img src={iconMastered} alt="icon-mastered" />
              <span className="text-preset-6">Mastered</span>
              <div className="flashcard-hint text-preset-6">0/5</div>
            </div>
          ) : (
            <div className="Bar">
              <div className="progress-bar">
                <div className="bar" style={{ width: `${12 * card.knownCount}px` }}></div>
              </div>
              <div className="flashcard-hint text-preset-6">{card.knownCount}/5</div>
            </div>
          )}
        </div>
        <div className="menu-container">
          <button onClick={() => setIsMenuOpen((v) => !v)}>
            <img src={iconMenu} alt="icon-menu" />
          </button>
        </div>
      </div>
      {isDeleteDialogOpen && (
        <DeleteDialog id={card.id} onClose={() => setIsDeleteDialogOpen(false)} />
      )}
      {isEditDialogOpen && (
        <EditDialog onClose={() => setIsEditDialogOpen(false)} flashcard={card} />
      )}
    </div>
  );
}
