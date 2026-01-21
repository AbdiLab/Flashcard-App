import "./styles.css";

import LogoSmall from "./assets/images/logo-small.svg";
import logoLarge from "./assets/images/logo-large.svg";
import { createContext, useContext, useMemo, useState } from "react";
import StudyMode from "./pages/StudyMode";
import AllCards from "./pages/AllCards";

import data from "./data.json";

export type Flashcards = typeof data.flashcards;

type ContextType = {
  flashcards: Flashcards;
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcards>>;
  filterLists: Flashcards;
  flashcardCategories: {
    name: string;
    count: number;
  }[];
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setHideMaster: React.Dispatch<React.SetStateAction<boolean>>;
  hideMaster: boolean;
};

const Context = createContext<ContextType | null>(null);

export function useAppContext() {
  const context = useContext(Context);

  if (context == null) {
    throw new Error("must use within provider");
  }

  return context;
}

export default function App() {
  const [page, setPage] = useState<"Study Mode" | "All Cards">("Study Mode");
  const [flashcards, setFlashcards] = useState<Flashcards>(() => data.flashcards);
  const [hideMaster, setHideMaster] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  const filterLists = useMemo(() => {
    const filter = flashcards.filter((card) => categories.includes(card.category));

    if (!filter.length)
      return flashcards.filter((card) => (hideMaster ? card.knownCount !== 5 : card));

    return filter.filter((card) => (hideMaster ? card.knownCount !== 5 : card));
  }, [categories, flashcards, hideMaster]);

  const flashcardCategories = useMemo(() => {
    const result = flashcards
      .map((card) => card.category)
      .reduce<Record<string, number>>((acc, name) => {
        acc[name] = (acc[name] || 0) + 1;
        return acc;
      }, {});

    return Object.entries(result).map(([name, count]) => ({
      name,
      count,
    }));
  }, [flashcards]);

  return (
    <div className="container" id="container">
      <header>
        <picture>
          <source media="(max-width: 375px)" srcSet={LogoSmall} />
          <img src={logoLarge} alt="logo" />
        </picture>

        <div className="tab">
          <button
            type="button"
            className={`btn-base-study-mode ${
              page === "Study Mode" && "active"
            } text-preset-4-semibold`}
            onClick={() => setPage("Study Mode")}>
            Study Mode
          </button>
          <button
            type="button"
            className={`btn-base-all-cards ${
              page === "All Cards" && "active"
            }  text-preset-4-semibold`}
            onClick={() => setPage("All Cards")}>
            All Cards
          </button>
        </div>
      </header>

      <Context.Provider
        value={{
          flashcards,
          setFlashcards,
          flashcardCategories,
          filterLists,
          categories,
          setCategories,
          setHideMaster,
          hideMaster,
        }}>
        {page === "Study Mode" ? (
          <StudyMode goToAllCards={() => setPage("All Cards")} />
        ) : (
          <AllCards />
        )}
      </Context.Provider>
    </div>
  );
}
