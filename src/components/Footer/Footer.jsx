import React from "react";
import "./Footer.css";
import github from "../../assets/github.svg";
import linked from "../../assets/linked.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copy">© 2025 Alex Manis, Powered by News API</p>

      <nav className="footer__nav">
        <div className="footer__links">
          <a href="/" className="footer__link">
            Home
          </a>
          <a
            href="https://tripleten.com"
            className="footer__link"
            target="_blank"
            rel="noreferrer"
          >
            TripleTen
          </a>
        </div>

        <div className="footer__logos">
          <a
            href="https://github.com"
            aria-label="GitHub"
            className="footer__logo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="GitHub logo" />
          </a>
          <a
            href="https://www.linkedin.com"
            aria-label="LinkedIn"
            className="footer__logo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linked} alt="LinkedIn logo" />
          </a>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
