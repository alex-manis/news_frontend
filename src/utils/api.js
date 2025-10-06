import { mockSavedArticles } from "./constants";

export function getSavedNews() {
  return Promise.resolve(mockSavedArticles);
}

export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export function saveArticle(article) {
  return Promise.resolve({
    ...article,
    _id: "test-saved-id-" + Date.now(),
    keyword: article.keyword || "General",
  });
}

export function deleteArticle(id) {
  return Promise.resolve({ message: `Article ${id} deleted` });
}
