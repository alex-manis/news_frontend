import "./SavedNewsPage.css";
import NewsCard from "../NewsCard/NewsCard";
import { useSavedNewsPage } from "../../hooks/useSavedNewsPage";

function SavedNewsPage({
  currentUser,
  savedArticles,
  onDeleteClick,
  isLoading,
  error,
}) {
  const { userMessage, keywordsMessage } = useSavedNewsPage(
    savedArticles,
    currentUser
  );

  if (isLoading) return <p>Loading saved articles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="saved-news">
      <section className="saved-news__container">
        <h1 className="saved-news__title">Saved articles</h1>
        <p className="saved-news__info">{userMessage}</p>
        <div className="saved-news__keywords">
          <p className="saved-news__keywords-title">By keywords: </p>
          <span className="saved-news__keywords-content">
            {keywordsMessage}
          </span>
        </div>
      </section>

      <div className="saved-news__list">
        {savedArticles.length ? (
          savedArticles.map((article) => (
            <NewsCard
              key={article._id}
              article={article}
              onDeleteClick={onDeleteClick}
              isSavedNewsPage={true}
            />
          ))
        ) : (
          <p className="saved-news__empty">No saved articles yet.</p>
        )}
      </div>
    </main>
  );
}

export default SavedNewsPage;
