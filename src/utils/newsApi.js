import { APIkey } from "./constants";
import { checkResponse } from "./api";

const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

const request = (url, options) => fetch(url, options).then(checkResponse);

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getNews = (query) => {
  const today = new Date().toISOString().split("T")[0];
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const url = `${newsApiBaseUrl}?q=${encodeURIComponent(
    query
  )}&from=${weekAgo}&to=${today}&pageSize=100&apiKey=${APIkey}`;

  return request(url).then((data) => {
    if (data.articles) {
      data.articles = data.articles.map((article) => ({
        ...article,
        publishedAt: formatDate(article.publishedAt),
      }));
    }
    return data;
  });
};
