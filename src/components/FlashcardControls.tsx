import { arrayToShuffled } from "array-shuffle";
import iconShuffle from "../assets/images/icon-shuffle.svg";

import iconChevronDown from "../assets/images/icon-chevron-down.svg";
import { Fragment, useEffect, useState } from "react";
import { useAppContext } from "../App";

export default function FlashcardControls() {
  const {
    flashcardCategories,
    categories,
    setCategories,
    setHideMaster,
    hideMaster,
    setFlashcards,
  } = useAppContext();
  const [isCategoryDropdownOpen, setIsCategoryDropDownOpen] = useState(false);

  useEffect(() => {
    if (isCategoryDropdownOpen === false) return;

    function handleEvent(e: Event) {
      if (e.target instanceof Element) {
        if (
          !e.target.closest("#btn-category-dropwdown") &&
          !e.target.closest(".categories-dropdown")
        ) {
          setIsCategoryDropDownOpen(false);
        }
      }
    }

    document.addEventListener("click", handleEvent);

    return () => {
      document.removeEventListener("click", handleEvent);
    };
  }, [isCategoryDropdownOpen]);
  return (
    <section className="flashcard-controls">
      <div className="category-filter">
        <button
          id="btn-category-dropwdown"
          type="button"
          className="btn-border"
          onClick={() => setIsCategoryDropDownOpen((v) => !v)}>
          <span className="text-preset-4-medium">All Categories</span>
          <img src={iconChevronDown} alt="icon-chevron-down" />
        </button>
        {isCategoryDropdownOpen && (
          <div className="categories-dropdown">
            {flashcardCategories.map((category, index) => {
              return (
                <Fragment key={category.name}>
                  <label className="dropwdown-item text-preset-5">
                    <input
                      className="input-checkbox-base"
                      type="checkbox"
                      checked={categories.includes(category.name)}
                      onChange={() =>
                        setCategories((pre) => {
                          return pre.includes(category.name)
                            ? pre.filter((v) => v !== category.name)
                            : [...pre, category.name];
                        })
                      }
                    />
                    <span className=""> {category.name}</span>
                    <span style={{ color: " #6d5b4d" }}>({category.count})</span>
                  </label>
                  {index < flashcardCategories.length - 1 && <hr />}
                </Fragment>
              );
            })}
          </div>
        )}

        <div className="hide-mastered-filter">
          <input
            id="hide-master-checkbox"
            type="checkbox"
            className="input-checkbox-base"
            checked={hideMaster}
            onChange={(e) => setHideMaster(e.target.checked)}
          />
          <span className="text-preset-4-medium">Hide Mastered</span>
        </div>
      </div>
      <button
        type="button"
        className="btn-border"
        onClick={() => setFlashcards((preFlashcards) => arrayToShuffled(preFlashcards))}>
        <img src={iconShuffle} alt="icon-shuffle" />
        <span className="text-preset-4-medium">Shuffle</span>
      </button>
    </section>
  );
}
