export const APIkey = import.meta.env.VITE_NEWS_API_KEY;

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://news-backend-i95y.onrender.com"
    : "http://localhost:3002";

// export const mockSavedArticles = [
//   {
//     _id: "65f7368dfb74bd6a92114c85",
//     title: "Some saved news article",
//     description: "This is a fake description",
//     url: "https://example.com/article1",
//     urlToImage: "https://picsum.photos/400/200",
//     publishedAt: "2024-09-21",
//     source: "Fake Source",
//     keyword: "Politics",
//   },
//   {
//     _id: "65f7371e7bce9e7d331b11a0",
//     title: "Another saved article",
//     description: "Another fake description",
//     url: "https://example.com/article2",
//     urlToImage: "https://picsum.photos/400/200?2",
//     publishedAt: "2024-09-22",
//     source: "Fake Source 2",
//     keyword: "Technology",
//   },
//   {
//     _id: "65f7371e7bce9e7d331b11a7",
//     title: "Yet another saved article",
//     description: "Fake description",
//     url: "https://example.com/article3",
//     urlToImage: "https://picsum.photos/400/200?3",
//     publishedAt: "2024-09-23",
//     source: "Fake Source 3",
//     keyword: "Science",
//   },
// ];
