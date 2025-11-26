import { BASE_URL } from "./constants";

export function getSavedNews(token) {
  return fetch(`${BASE_URL}/articles`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export function saveArticle(article, token) {
  return fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(article),
  }).then(checkResponse);
}

export function deleteArticle(id, token) {
  return fetch(`${BASE_URL}/articles/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export async function checkResponse(res) {
  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data.message || "Something went wrong");
    error.statusCode = res.status;
    throw error;
  }
  return data;
}
