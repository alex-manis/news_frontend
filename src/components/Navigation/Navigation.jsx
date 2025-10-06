import { Link, useLocation } from "react-router-dom";
import { useContext, useRef } from "react";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext";
import { useNavIndicator } from "../../hooks/useNavIndicator";
import { useBurgerMenu } from "../../hooks/useBurgerMenu";
import "./Navigation.css";

function Navigation({ onLoginClick, logOut, resetSearch, isModalOpen }) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const navRef = useRef(null);
  const indicatorRef = useRef(null);

  const { isMobile, isMenuOpen, toggleMenu, closeMenu } = useBurgerMenu();

  useNavIndicator(navRef, indicatorRef, location, currentUser);

  return (
    <nav
      className={`navigation ${isMenuOpen ? "navigation--menu-open" : ""}`}
      ref={navRef}
    >
      <Link to="/" className="navigation__logo" onClick={resetSearch}>
        NewsExplorer
      </Link>
      {isMenuOpen && (
        <div
          className="navigation__overlay navigation__overlay--visible"
          onClick={closeMenu}
        />
      )}

      <div
        className={`navigation__menu ${
          isMobile ? (isMenuOpen ? "navigation__menu--open" : "") : ""
        }`}
      >
        <Link to="/" className="navigation__link" onClick={closeMenu}>
          Home
        </Link>

        {currentUser && (
          <Link
            to="/saved-news"
            className="navigation__link"
            onClick={closeMenu}
          >
            Saved articles
          </Link>
        )}

        <div className="navigation__auth-buttons">
          {!currentUser && (
            <button
              onClick={() => {
                closeMenu();
                onLoginClick();
              }}
              className="navigation__auth-btn"
            >
              Sign in
            </button>
          )}
          {currentUser && (
            <button onClick={logOut} className="navigation__logout-btn">
              {currentUser.name}
              <svg
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 2L2 2L2 14H6V16H2C0.89543 16 0 15.1046 0 14V2C0 0.89543 0.895432 0 2 0H6V2ZM13.5856 9.00002L9.29274 13.1339L10.707 14.4958L17.4141 8.03706L10.707 1.57837L9.29274 2.9402L13.5856 7.0741H4V9.00002H13.5856Z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {isMobile && (
        <button
          className={`navigation__burger ${
            isMenuOpen ? "navigation__burger--open" : ""
          }`}
          onClick={toggleMenu}
          aria-label="Menu"
          style={{ display: isModalOpen ? "none" : "flex" }}
        >
          <span />
          <span />
        </button>
      )}

      {!isMobile && (
        <div className="navigation__indicator" ref={indicatorRef} />
      )}
    </nav>
  );
}

export default Navigation;
