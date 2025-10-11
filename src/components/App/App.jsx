import { useEffect, useState } from "react";
import { register, login, checkToken } from "../../utils/auth";
import { saveToken, getToken, removeToken } from "../../utils/token";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";

import About from "../About/About";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SavedNewsPage from "../SavedNewsPage/SavedNewsPage";
import Main from "../Main/Main";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import SuccessModal from "../SuccessModal/SuccessModal";

import { getNews } from "../../utils/newsApi";
import { getSavedNews, deleteArticle } from "../../utils/api";
import { APIkey } from "../../utils/constants";
import "../../vendor/fonts.css";

function App() {
  // ----- State -----
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [loginError, setLoginError] = useState("");
  const [newsItems, setNewsItems] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [topic, setTopic] = useState("");
  const [topicError, setTopicError] = useState("");
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoadingSaved, setIsLoadingSaved] = useState(false);
  const [savedError, setSavedError] = useState("");

  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";
  const navigate = useNavigate();

  // ----- Modals -----
  const openRegisterModal = () => setActiveModal("register");
  const openLoginModal = () => setActiveModal("login");
  const openSuccessModal = () => setActiveModal("success");
  const closeActiveModal = () => setActiveModal("");

  // ----- News search -----
  const handleSearch = (keyword) => {
    setIsLoading(true);
    setSearchError("");
    setSearchPerformed(false);

    getNews(keyword, APIkey)
      .then((data) => {
        if (!data.articles.length) {
          setNewsItems([]);
          setSearchError("");
        } else {
          setNewsItems(
            data.articles.map((a, i) => ({
              _id: `${a.url}-${i}`,
              title: a.title,
              description: a.description,
              url: a.url,
              urlToImage: a.urlToImage,
              publishedAt: a.publishedAt,
              source: a.source.name,
            }))
          );
        }
      })
      .catch(() => {
        setNewsItems([]);
        setSearchError("Sorry, something went wrong. Try again later.");
      })
      .finally(() => {
        setIsLoading(false);
        setSearchPerformed(true);
      });
  };

  // ----- Search form submit handler -----
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      setTopicError("Please enter a keyword");
      return;
    }
    setTopicError("");
    handleSearch(topic);
    setTopic("");
  };

  // ----- General submit handler for requests -----
  const handleSubmit = (request) => {
    setIsLoading(true);
    return request()
      .catch((err) => {
        console.error(err);
        throw err;
      })
      .finally(() => setIsLoading(false));
  };

  // ----- Card like handler -----
  const handleCardLike = (article) => {
    setNewsItems((items) =>
      items.map((item) => {
        if (item._id === article._id) {
          const isLiked = item.isLiked || false;
          return {
            ...item,
            isLiked: !isLiked,
            keyword: item.keyword || article.keyword || "",
          };
        }
        return item;
      })
    );
  };

  // ----- Registration -----
  const handleRegister = ({ name, email, password }) =>
    handleSubmit(() =>
      register({ name, email, password }).then(() => {
        openSuccessModal();
      })
    );

  // ----- Login -----
  const handleLogin = ({ email, password }) => {
    setLoginError("");
    handleSubmit(() =>
      login({ email, password })
        .then((res) => {
          if (!res.token) throw new Error("No token in response");
          saveToken(res.token);
          return checkToken(res.token);
        })
        .then((res) => {
          setCurrentUser(res.data);
          setIsLoggedIn(true);
          setActiveModal("");
        })
    ).catch(() => setLoginError("Email or password incorrect"));
  };

  // ----- Load saved articles when logged in -----
  useEffect(() => {
    if (isLoggedIn) {
      setIsLoadingSaved(true);
      getSavedNews()
        .then((items) => setSavedArticles(items))
        .catch(() => setSavedError("Failed to load saved articles"))
        .finally(() => setIsLoadingSaved(false));
    } else {
      setSavedArticles([]);
    }
  }, [isLoggedIn]);

  // ----- Delete saved article -----
  const handleDelete = (article) => {
    deleteArticle(article._id)
      .then(() => {
        setSavedArticles((prev) => prev.filter((a) => a._id !== article._id));
      })
      .catch((err) => console.error(err));
  };

  // ----- Sign out -----
  const handleSignOut = () => {
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setNewsItems([]);
    navigate("/");
    setSearchPerformed(false);
  };

  // ----- Token check on app load -----
  useEffect(() => {
    const token = getToken();
    if (token) {
      checkToken(token)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res.data);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setCurrentUser(null);
          setNewsItems([]);
        });
    }
  }, []);

  // ----- Reset search-----

  const resetSearch = () => {
    setNewsItems([]);
    setSearchError("");
    setSearchPerformed(false);
    setTopic("");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header
            onSearchSubmit={handleSearchSubmit}
            topic={topic}
            setTopic={setTopic}
            topicError={topicError}
            openLoginModal={openLoginModal}
            isLoading={isLoading}
            isSavedNewsPage={isSavedNewsPage}
            isLoggedIn={isLoggedIn}
            logOut={handleSignOut}
            resetSearch={resetSearch}
            setTopicError={setTopicError}
            isModalOpen={activeModal !== ""}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  newsItems={newsItems}
                  searchError={searchError}
                  searchPerformed={searchPerformed}
                  isLoggedIn={isLoggedIn}
                  onDeleteClick={() => {}}
                  isLoading={isLoading}
                  onCardLike={handleCardLike}
                >
                  {!isSavedNewsPage && <About />}
                </Main>
              }
            />
            <Route
              path="/saved-news"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SavedNewsPage
                    currentUser={currentUser}
                    savedArticles={savedArticles}
                    onDeleteClick={handleDelete}
                    isLoading={isLoadingSaved}
                    error={savedError}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            isLoading={isLoading}
            onLoginClick={openLoginModal}
          />

          <SuccessModal
            isOpen={activeModal === "success"}
            onClose={() => setActiveModal("")}
            onLoginClick={() => setActiveModal("login")}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            isLoading={isLoading}
            onRegisterClick={openRegisterModal}
            loginError={loginError}
            setLoginError={setLoginError}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
