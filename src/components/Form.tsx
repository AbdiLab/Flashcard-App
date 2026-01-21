import { useId, useState, type FormEvent } from "react";
import iconCirclePlus from "../assets/images/icon-circle-plus.svg";
import iconError from "../assets/images/icon-error.svg";
import { useAppContext, type Flashcards } from "../App";
import { useAllCardContext } from "../pages/AllCards";

type FormProps = {
  defualtValue?: Flashcards[number];
  isEditMode: boolean;
  onClose?: () => void;
};

export default function Form({ defualtValue, isEditMode, onClose }: FormProps) {
  const { setFlashcards } = useAppContext();

  const question = useInput(defualtValue?.question || "");
  const answer = useInput(defualtValue?.answer || "");
  const category = useInput(defualtValue?.category || "");

  const [isAfterFirstSubmit, setIsAfterFirstSubmit] = useState(isEditMode);
  const questionErrors = isAfterFirstSubmit ? validateInput(question.value) : [];

  const answerErrors = isAfterFirstSubmit ? validateInput(answer.value) : [];
  const categoryErrors = isAfterFirstSubmit ? validateInput(category.value) : [];

  const id = useId();

  const { setToastMessage, setToggleToast } = useAllCardContext();

  function handleForm(e: FormEvent) {
    e.preventDefault();
    setIsAfterFirstSubmit(true);

    const questionResult = validateInput(question.value);
    const answerResult = validateInput(answer.value);
    const categoryResult = validateInput(category.value);

    if (questionResult.length === 0 && answerResult.length === 0 && categoryResult.length === 0) {
      if (defualtValue) {
        setFlashcards((preFlashcard) =>
          preFlashcard.map((card) =>
            card.id === defualtValue.id
              ? {
                  ...card,
                  answer: answer.value,
                  category: category.value,
                  question: question.value,
                }
              : card,
          ),
        );

        setToastMessage("Card updated successfully.");
        setToggleToast(true);

        onClose?.();
      } else {
        setFlashcards((pre) => [
          ...pre,
          {
            id: crypto.randomUUID(),
            answer: answer.value,
            category: category.value,
            knownCount: 0,
            question: question.value,
          },
        ]);
        setToastMessage("card created succesfully.");
        setToggleToast(true);
      }
    }
  }

  return (
    <>
      <form onSubmit={handleForm}>
        <div className="new-card-form">
          <div className={`input ${questionErrors.length > 0 && "error"}`}>
            <label htmlFor={`question-${id}`} className="text-preset-4-medium">
              Question
            </label>
            <input
              defaultValue={defualtValue?.question}
              id={`question-${id}`}
              type="text"
              className="text-preset-4-regular"
              placeholder="e.g., What is the capital of France?"
              onChange={(e) => question.takeInput(e.target.value)}
            />
            <div className="error-message-container">
              <img src={iconError} alt="icon-error" />
              <span className="text-preset-5-regular">Please enter a question.</span>
            </div>
          </div>
          <div className={`textarea  ${answerErrors.length > 0 && "error"}`}>
            <label htmlFor={`answer-${id}`} className="text-preset-4-medium">
              Answer
            </label>
            <textarea
              defaultValue={defualtValue?.answer}
              id={`answer-${id}`}
              className="text-preset-4-regular"
              placeholder="Placeholder text"
              onChange={(e) => answer.takeInput(e.target.value)}></textarea>
            <div className="error-message-container">
              <img src={iconError} alt="icon-error" />
              <span className="text-preset-5-regular">Please enter a question.</span>
            </div>
          </div>
          <div className={`input ${categoryErrors.length > 0 && "error"}`}>
            <label htmlFor={`category-${id}`} className="text-preset-4-medium">
              Category
            </label>
            <input
              defaultValue={defualtValue?.category}
              id={`category-${id}`}
              type="text"
              className="text-preset-4-regular"
              placeholder="e.g., What is the capital of France?"
              onChange={(e) => category.takeInput(e.target.value)}
            />
            <div className="error-message-container">
              <img src={iconError} alt="icon-error" />
              <span className="text-preset-5-regular">Please enter a question.</span>
            </div>
          </div>
        </div>
        {isEditMode ? (
          <div className="create-card-container" style={{ alignSelf: "flex-end" }}>
            <button type="submit" className="btn-primary">
              <img src={iconCirclePlus} alt="icon-circle-plus" />
              <span className="text-preset-4-semibold">Update Card</span>
            </button>
          </div>
        ) : (
          <div className="create-card-container">
            <button type="submit" className="btn-primary">
              <img src={iconCirclePlus} alt="icon-circle-plus" />
              <span className="text-preset-4-semibold">Create Card</span>
            </button>
          </div>
        )}
      </form>
    </>
  );
}

function useInput(initalValue: string) {
  const [value, setValue] = useState(initalValue);

  function takeInput(input: string) {
    setValue(input);
  }

  return { value, takeInput };
}

function validateInput(value: string) {
  const errors = [];

  if (value.trim() === "") {
    errors.push("Please enter a question.");
  }

  return errors;
}
