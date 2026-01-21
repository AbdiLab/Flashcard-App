import { useMemo } from "react";
import { useAppContext } from "../App";

import iconStatsTotal from "../assets/images/icon-stats-total.svg";
import iconStatsMastered from "../assets/images/icon-stats-mastered.svg";
import iconStatsInProgress from "../assets/images/icon-stats-in-progress.svg";
import iconStatsNotStarted from "../assets/images/icon-stats-not-started.svg";

export default function StudyStatistics() {
  const { filterLists } = useAppContext();

  const masteredFlashcard = useMemo(() => {
    return filterLists.filter((card) => card.knownCount === 5).length;
  }, [filterLists]);
  const inProgressFlashcard = useMemo(() => {
    return filterLists.filter((card) => card.knownCount > 0 && card.knownCount < 5).length;
  }, [filterLists]);
  const notStartedFlashcard = useMemo(() => {
    return filterLists.filter((card) => card.knownCount === 0).length;
  }, [filterLists]);
  return (
    <section className="statistics-section">
      <div className="text-preset-2">Study Statistics</div>
      <div className="statistics-content">
        <div className="total-cards">
          <div className="total-cards-container">
            <div className="total-cards-text text-preset-4-medium">Total Cards</div>
            <div className="total-cards-count text-preset-1">{filterLists.length}</div>
          </div>
          <div className="total-cards-icon-container">
            <img src={iconStatsTotal} alt="icon-stats-total" />
          </div>
        </div>
        <div className="total-cards">
          <div className="mastered-container">
            <div className="total-cards-text text-preset-4-medium">mastered</div>
            <div className="total-cards-count text-preset-1">{masteredFlashcard}</div>
          </div>
          <div className="mastered-icon-container">
            <img src={iconStatsMastered} alt="icon-stats-mastered" />
          </div>
        </div>
        <div className="total-cards">
          <div className="in-progress-container">
            <div className="total-cards-text text-preset-4-medium">In Progress</div>
            <div className="total-cards-count text-preset-1">{inProgressFlashcard}</div>
          </div>
          <div className="in-progress-icon-container">
            <img src={iconStatsInProgress} alt="icon-stats-in-progress" />
          </div>
        </div>
        <div className="total-cards">
          <div className="not-started-container">
            <div className="total-cards-text text-preset-4-medium">Not Started</div>
            <div className="total-cards-count text-preset-1">{notStartedFlashcard}</div>
          </div>
          <div className="not-started-icon-container">
            <img src={iconStatsNotStarted} alt="icon-stats-not-started" />
          </div>
        </div>
      </div>
    </section>
  );
}
