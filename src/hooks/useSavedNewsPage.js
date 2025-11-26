import { useMemo } from "react";

export function useSavedNewsPage(savedArticles, currentUser) {
  const count = savedArticles.length;

  const uniqueKeywords = useMemo(() => {
    const allKeywords = savedArticles.map((a) =>
      (a.keyword || "General").trim().toLowerCase()
    );

    const unique = [...new Set(allKeywords)];

    return unique.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  }, [savedArticles]);

  const userName = currentUser?.name || "User";
  const userMessage = `${userName}, you have ${count} saved articles`;

  const keywordCount = uniqueKeywords.length;

  const keywordsMessage =
    keywordCount === 0
      ? ""
      : keywordCount === 1
      ? uniqueKeywords[0]
      : keywordCount === 2
      ? `${uniqueKeywords[0]}, ${uniqueKeywords[1]}`
      : `${uniqueKeywords[0]}, ${uniqueKeywords[1]}, and ${
          keywordCount - 2
        } others`;

  return { count, uniqueKeywords, userMessage, keywordsMessage };
}
