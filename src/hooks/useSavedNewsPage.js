import { useMemo } from "react";

export function useSavedNewsPage(savedArticles, currentUser) {
  const count = savedArticles.length;

  const keywords = useMemo(
    () =>
      [...new Set(savedArticles.map((a) => a.keyword || "General"))].slice(
        0,
        3
      ),
    [savedArticles]
  );

  const userName = currentUser?.name || "User";
  const userMessage = `${userName}, you have ${count} saved articles`;
  const keywordsMessage =
    keywords.length <= 2
      ? keywords.join(", ")
      : `${keywords[0]}, ${keywords[1]}, and ${count - 2} others`;

  return { count, keywords, userMessage, keywordsMessage };
}
