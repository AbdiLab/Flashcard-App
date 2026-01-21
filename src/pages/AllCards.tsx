import { createContext, useContext, useState } from "react";

import Flashcard from "../components/Flashcard";
import Form from "../components/Form";
import { useAppContext } from "../App";
import Toast from "../components/Toast";
import FlashcardControls from "../components/FlashcardControls";

type AllCardContext = {
  setToggleToast: React.Dispatch<React.SetStateAction<boolean>>;
  setToastMessage: React.Dispatch<React.SetStateAction<string>>;
};

const allCardContext = createContext<AllCardContext | null>(null);

export function useAllCardContext() {
  const context = useContext(allCardContext);

  if (context === null) {
    throw new Error("must use within allCard Context");
  }

  return context;
}

export default function AllCards() {
  const { flashcards, filterLists } = useAppContext();

  const [pagination, setPagination] = useState(9);

  const [toggleToast, setToggleToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  return (
    <allCardContext.Provider value={{ setToggleToast, setToastMessage }}>
      <main className="main-content-all-cards">
        <section className="create-new-card">
          <Form isEditMode={false} />
        </section>
        <FlashcardControls />

        {flashcards.length === 0 ? (
          <section className="all-card-flashcard-container">
            <div className="all-card-flashcard-hint-container">
              <div className="text-preset-2">No cards yet</div>
              <div className="text-preset-4-regular">
                Add your first card using the form above and it will show up here.
              </div>
            </div>
          </section>
        ) : (
          <section className="flashcards-container">
            {filterLists.map((card, index) => {
              return index < pagination && <Flashcard key={card.id} card={card} />;
            })}
          </section>
        )}

        <section className="pagination">
          <button
            className="btn-secondary text-preset-4-medium"
            onClick={() =>
              setPagination((pre) => {
                if (pre >= filterLists.length && filterLists.length <= 9) return pre;
                return (pre += pre);
              })
            }>
            Load More
          </button>
        </section>
      </main>
      {toggleToast && <Toast onClose={() => setToggleToast(false)} messageToast={toastMessage} />}
    </allCardContext.Provider>
  );
}
