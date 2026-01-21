import type { Flashcards } from "../App";

import patternStartYellow from "../assets/images/pattern-star-yellow.svg";
import patternStartBlue from "../assets//images/pattern-star-blue.svg";
import patternStarPink from "../assets/images/pattern-star-pink.svg";

import iconMastered from "../assets/images/icon-mastered.svg";
import { useEffect, useState } from "react";

type CurrentFlashcardContentProps = {
  currentQuestion: Flashcards[number];
  isMasteredFlashcard: boolean;
};

export default function CurrentFlashcardContent({
  currentQuestion,
  isMasteredFlashcard,
}: CurrentFlashcardContentProps) {
  const [revealAnswer, setRevealAnswer] = useState(false);

  useEffect(() => {
    if (revealAnswer === true) {
      setRevealAnswer(false);
    }
  }, [currentQuestion]);

  return (
    <div
      className={`flashcard-content ${revealAnswer && "asnwer"}`}
      // style={{ backgroundColor: `${revealAnswer && "#92ADEB"}` }}
    >
      <div className="flashcard-tag text-preset-6">{currentQuestion.category}</div>
      <div className="question-container">
        {revealAnswer ? (
          <>
            {" "}
            <div className="flashcard-hint text-preset-4-medium">Answer:</div>
            <div className="flashcard-question text-preset-1">HyperText Markup Language</div>
          </>
        ) : (
          <>
            <div className="flashcard-question text-preset-1">{currentQuestion.question}</div>
            <div
              className="flashcard-hint text-preset-4-medium"
              style={{ cursor: "pointer" }}
              onClick={() => setRevealAnswer(true)}>
              Click to reveal answer
            </div>
          </>
        )}
      </div>
      {isMasteredFlashcard ? (
        <div className="mastered">
          <img src={iconMastered} alt="icon-mastered" />
          <span className="text-preset-6">Mastered</span>
          <div className="flashcard-hint text-preset-6">0/5</div>
        </div>
      ) : (
        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="bar"
              style={{
                width: `${12 * currentQuestion.knownCount}px`,
              }}></div>
          </div>
          <div className="flashcard-hint text-preset-6">{currentQuestion.knownCount}/5</div>
        </div>
      )}
      <img className="pattern-star-yellow" src={patternStartYellow} alt="pattern-star-yellow" />
      {revealAnswer ? (
        <img className="pattern-star-blue" src={patternStarPink} alt="pattern-star-blue" />
      ) : (
        <img className="pattern-star-blue" src={patternStartBlue} alt="pattern-star-blue" />
      )}
    </div>
  );
}

export function FlashCardContentAnswer({
  currentQuestion,
  isMasteredFlashcard,
}: CurrentFlashcardContentProps) {
  return (
    <div className="flashcard-content asnwer">
      <div className="flashcard-tag text-preset-6">Web Development</div>
      <div className="question-container">
        <div className="flashcard-hint text-preset-4-medium">Answer:</div>
        <div className="flashcard-question text-preset-1">HyperText Markup Language</div>
      </div>
      {isMasteredFlashcard ? (
        <div className="mastered">
          <img src={iconMastered} alt="icon-mastered" />
          <span className="text-preset-6">Mastered</span>
          <div className="flashcard-hint text-preset-6">0/5</div>
        </div>
      ) : (
        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="bar"
              style={{
                width: `${12 * currentQuestion.knownCount}px`,
              }}></div>
          </div>
          <div className="flashcard-hint text-preset-6">{currentQuestion.knownCount}/5</div>
        </div>
      )}
      <img className="pattern-star-yellow" src={patternStartYellow} alt="pattern-star-yellow" />
      <img className="pattern-star-blue" src={patternStarPink} alt="pattern-star-blue" />
    </div>
  );
}
