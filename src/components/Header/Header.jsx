import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({
  onSearchSubmit,
  topic,
  setTopic,
  setTopicError,
  topicError,
  openLoginModal,
  isLoading,
  isSavedNewsPage,
  isLoggedIn,
  logOut,
  resetSearch,
  isModalOpen,
}) {
  const handleChange = (e) => {
    setTopic(e.target.value);
    if (topicError) setTopicError("");
  };

  return (
    <header className={`header ${isSavedNewsPage ? "header__saved" : ""}`}>
      <Navigation
        onLoginClick={openLoginModal}
        isSavedNewsPage={isSavedNewsPage}
        isLoggedIn={isLoggedIn}
        logOut={logOut}
        resetSearch={resetSearch}
        isModalOpen={isModalOpen}
      />

      {!isSavedNewsPage && (
        <section className="search">
          <div className="search__overlay">
            <h1 className="search__title">
              What’s going on in <br /> the world?
            </h1>
            <p className="search__subtitle">
              Find the latest news on any topic and save them in your personal
              account.
            </p>
            <form className="search__form" onSubmit={onSearchSubmit}>
              <input
                type="text"
                className="search__input"
                placeholder="Enter topic"
                value={topic}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="search__button"
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Search"}
              </button>
              {topicError && <p className="search__error">{topicError}</p>}
            </form>
          </div>
        </section>
      )}
    </header>
  );
}

export default Header;
