import { useState } from "react";
import "./Main.css";
import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/Preloader";

function Main({
  children,
  onCardLike,
  onDeleteClick,
  isLoggedIn,
  newsItems = [],
  searchError = "",
  searchPerformed = false,
  isLoading = false,
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => setVisibleCount((prev) => prev + 3);
  const visibleItems = newsItems.slice(0, visibleCount);

  const showEmpty =
    !isLoading && searchPerformed && !searchError && newsItems.length === 0;
  const showError = !isLoading && searchError;
  const showResults = !isLoading && visibleItems.length > 0;

  return (
    <main className="main">
      {(searchPerformed || isLoading) && (
        <section
          className="cards"
          style={{ position: "relative", minHeight: "150px" }}
        >
          {isLoading && <Preloader text="Searching news..." />}

          {showError && <p className="cards__error">{searchError}</p>}

          {showResults && <p className="cards__text">Search results</p>}

          {showResults && (
            <>
              <ul className="cards__list">
                {visibleItems.map((article) => (
                  <NewsCard
                    key={article._id || article.url}
                    article={article}
                    onDeleteClick={onDeleteClick}
                    isLoggedIn={isLoggedIn}
                    onCardLike={onCardLike}
                  />
                ))}
              </ul>
              {visibleItems.length < newsItems.length && (
                <button className="cards__more-button" onClick={handleShowMore}>
                  Show more
                </button>
              )}
            </>
          )}

          {showEmpty && (
            <section className="cards__empty">
              <div className="cards__empty-image"></div>
              <p className="cards__empty-title">No results yet</p>
              <p className="cards__empty-description">
                Sorry, but nothing matched <br /> your search terms.
              </p>
            </section>
          )}
        </section>
      )}
      {children}
    </main>
  );
}

export default Main;
