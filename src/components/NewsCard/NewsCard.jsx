import { useContext } from "react";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext";
import "./NewsCard.css";
import noImage from "../../assets/no-image.png";

function NewsCard({
  article,
  isSavedNewsPage = false,
  onDeleteClick,
  handleCardClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const articleLikeButtonClassName = `card__like-btn ${
    article.isLiked ? "card__like-btn_active" : ""
  }`;

  return (
    <li className="card">
      <div className="card__image-wrapper">
        {isSavedNewsPage && article.keyword && (
          <span className="card__keyword">{article.keyword}</span>
        )}

        <img
          onClick={() => handleCardClick && handleCardClick(article)}
          className="card__image"
          src={article.urlToImage || noImage}
          alt={article.title}
        />

        {isSavedNewsPage ? (
          <div className="card__action-wrapper">
            <button
              type="button"
              className="card__delete-btn"
              onClick={() => onDeleteClick && onDeleteClick(article)}
            />
            <div className="card__tooltip">Removed from saved</div>
          </div>
        ) : (
          <div className="card__action-wrapper">
            <button
              type="button"
              className={articleLikeButtonClassName}
              onClick={currentUser ? () => onCardLike(article) : undefined}
              disabled={article.isLoading}
            />
            {!currentUser && (
              <div className="card__tooltip">Sign in to save articles</div>
            )}
          </div>
        )}
      </div>

      <div className="card__content">
        <p className="card__date">{article.publishedAt}</p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="card__link-article"
        >
          <h2 className="card__title">{article.title}</h2>
          <p className="card__description">{article.description}</p>
        </a>
        <p className="card__source">{article.source}</p>
      </div>
    </li>
  );
}

export default NewsCard;
