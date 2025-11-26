import { useState, useEffect, useCallback } from "react";
import { saveArticle, deleteArticle } from "../utils/api";
import { getToken } from "../utils/token";
import noImage from "../assets/no-image.png";

const LOCAL_KEY = "savedArticlesCache";

export function useArticleActions(initialSaved = [], initialTopic = "News") {
  const [savedArticles, setSavedArticles] = useState(() => {
    try {
      const cached = localStorage.getItem(LOCAL_KEY);
      return cached ? JSON.parse(cached) : initialSaved;
    } catch {
      return initialSaved;
    }
  });

  const [topic, setTopic] = useState(initialTopic);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(savedArticles));
  }, [savedArticles]);

  const setArticleLoading = useCallback((setNewsItems, url, value) => {
    setNewsItems((items) =>
      items.map((i) => (i.url === url ? { ...i, isLoading: value } : i))
    );
  }, []);

  const formatArticleForSave = useCallback(
    (article, currentTopic) => ({
      keyword: currentTopic || "News",
      title: article.title || "No title",
      text: article.description || article.content || "No description",
      date: article.publishedAt || new Date().toISOString(),
      source:
        typeof article.source === "object"
          ? article.source.name
          : article.source || "Unknown source",
      link: article.url || article.link,
      image: article.urlToImage || article.image || noImage,
    }),
    []
  );

  const updateAfterSave = useCallback((setNewsItems, article, savedArticle) => {
    const mapped = {
      _id: savedArticle._id,
      title: savedArticle.title,
      description: savedArticle.text,
      url: savedArticle.link,
      urlToImage: savedArticle.image || noImage,
      publishedAt: savedArticle.date,
      source: savedArticle.source,
      keyword: savedArticle.keyword,
      isLiked: true,
    };

    setSavedArticles((prev) =>
      prev.some((s) => s._id === mapped._id) ? prev : [...prev, mapped]
    );

    setNewsItems((items) =>
      items.map((i) =>
        i.url === article.url
          ? { ...i, isLiked: true, savedId: savedArticle._id, isLoading: false }
          : i
      )
    );
  }, []);

  const updateAfterDelete = useCallback(
    (setNewsItems, article, existingArticle) => {
      setSavedArticles((prev) =>
        prev.filter((a) => a._id !== existingArticle._id)
      );

      const articleUrl = article.url || article.link;

      setNewsItems((items) =>
        items.map((i) =>
          i.url === articleUrl
            ? { ...i, isLiked: false, savedId: null, isLoading: false }
            : i
        )
      );
    },
    []
  );

  const likeArticle = useCallback(
    (article, setNewsItems, currentTopic) => {
      const token = getToken();
      if (!token) return;

      setArticleLoading(setNewsItems, article.url, true);

      const formatted = {
        ...formatArticleForSave(article),
        keyword: currentTopic || "News",
      };

      return saveArticle(formatted, token)
        .then((saved) => {
          const savedArticle = saved.data || saved;
          updateAfterSave(setNewsItems, article, savedArticle);
        })
        .catch((err) => {
          console.error("Error saving article:", err);
          setArticleLoading(setNewsItems, article.url, false);
        });
    },
    [formatArticleForSave, setArticleLoading, updateAfterSave]
  );

  const unlikeArticle = useCallback(
    (article, existingArticle, setNewsItems) => {
      const token = getToken();
      if (!token) return;

      setArticleLoading(setNewsItems, article.url, true);

      return deleteArticle(existingArticle._id, token)
        .then(() => updateAfterDelete(setNewsItems, article, existingArticle))
        .catch((err) => {
          console.error("Error deleting article:", err);
          setArticleLoading(setNewsItems, article.url, false);
        });
    },
    [setArticleLoading, updateAfterDelete]
  );

  const handleCardLike = useCallback(
    (article, setNewsItems, currentTopic) => {
      const token = getToken();
      if (!token || article.isLoading) return;

      const existingArticle = savedArticles.find((a) => a.url === article.url);

      existingArticle
        ? unlikeArticle(article, existingArticle, setNewsItems)
        : likeArticle(article, setNewsItems, currentTopic);
    },
    [savedArticles, likeArticle, unlikeArticle]
  );

  const clearSaved = useCallback(() => {
    setSavedArticles([]);
    localStorage.removeItem(LOCAL_KEY);
  }, []);

  const syncNewsWithSaved = useCallback(
    (setNewsItems) => {
      setNewsItems((items) => {
        if (!items?.length) return items;
        const savedMap = new Map(savedArticles.map((a) => [a.url, a._id]));

        return items.map((item) => ({
          ...item,
          isLiked: savedMap.has(item.url),
          savedId: savedMap.get(item.url) || null,
        }));
      });
    },
    [savedArticles]
  );

  return {
    savedArticles,
    setSavedArticles,
    handleCardLike,
    clearSaved,
    syncNewsWithSaved,
    topic,
    setTopic,
  };
}
