// import iconChevronDown from "../assets/images/icon-chevron-down.svg";
// import iconShuffle from "../assets/images/icon-shuffle.svg";
import iconCircleCheck from "../assets/images/icon-circle-check.svg";
import iconReset from "../assets/images/icon-reset.svg";
import iconChevronLeft from "../assets/images/icon-chevron-left.svg";
import iconChevronRight from "../assets/images/icon-chevron-right.svg";

import { useAppContext } from "../App";
import { useState } from "react";
import StudyStatistics from "../components/StudyStatistics";
import CurrentFlashcardContent from "../components/CurrentFlashcardContent";
import FlashcardControls from "../components/FlashcardControls";

export default function StudyMode({ goToAllCards }: { goToAllCards: () => void }) {
  const { filterLists, setFlashcards } = useAppContext();
  const [currentFlashcard, setCurrentFlashcard] = useState(0);

  function resetProgress() {
    setFlashcards((prev) => prev.map((card) => ({ ...card, knownCount: 0 })));
  }

  function IknowThis(id: string) {
    setFlashcards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, knownCount: card.knownCount + 1 } : card)),
    );
    nextFlashcard();
  }

  function nextFlashcard() {
    setCurrentFlashcard((current) => {
      if (current === filterLists.length - 1) return 0;
      return current + 1;
    });
  }

  return (
    <>
      <main className="main-content">
        <section className={`flashcard-section ${!filterLists.length && "empty-state"}`}>
          <div className="flashcard-header">
            <FlashcardControls />
          </div>
          <hr />

          {filterLists.length ? (
            <>
              {" "}
              <div className={`flashcard-container `}>
                <CurrentFlashcardContent
                  isMasteredFlashcard={filterLists[currentFlashcard].knownCount == 5}
                  currentQuestion={filterLists[currentFlashcard]}
                />

                <div className="flashcard-actions">
                  <button
                    className="btn-primary"
                    disabled={filterLists[currentFlashcard].knownCount == 5}
                    onClick={() => IknowThis(filterLists[currentFlashcard].id)}>
                    <img src={iconCircleCheck} alt="icon-circle-check" />
                    <span className="text-preset-4-medium">I know This</span>
                  </button>

                  <button className="btn-secondary" onClick={() => resetProgress()}>
                    <img src={iconReset} alt="icon-reset" />
                    <span className="text-preset-4-medium">Reset Progress</span>
                  </button>
                </div>
              </div>
              <hr />
              <div className="navigation-controls">
                <button
                  className="btn-border"
                  onClick={() =>
                    setCurrentFlashcard((current) => {
                      if (current === 0) return filterLists.length - 1;
                      return current - 1;
                    })
                  }>
                  <img src={iconChevronLeft} alt="icon-chevron-left" />
                  <span className="text-preset-4-medium">Previous</span>
                </button>
                <span className="card-counter text-preset-5">
                  Card {currentFlashcard + 1} of {filterLists.length}
                </span>
                <button className="btn-border" onClick={() => nextFlashcard()}>
                  <span className="text-preset-4-medium">Next</span>
                  <img src={iconChevronRight} alt="icon-chevron-left" />
                </button>
              </div>{" "}
            </>
          ) : (
            <div className="flashcard-container empty-state">
              <div className="flashcard-hint-container">
                <div className="falshcard-hint text-preset-2">No cards to study</div>
                <div className="flashcard-hint text-preset-4-regular" style={{ color: "#6d5b4d" }}>
                  You don’t have any cards yet. Add your first card in the All Cards tab.
                </div>
              </div>
              <button className="btn-secondary text-preset-4-medium" onClick={goToAllCards}>
                Go to All Cards
              </button>
            </div>
          )}
        </section>
        <StudyStatistics />
      </main>
    </>
  );
}
