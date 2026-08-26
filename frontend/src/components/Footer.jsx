import { Link } from "react-router-dom";

import "../styles/footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-brand-name">BlueCart</span>
          <p className="footer-tagline">
            Compare products across marketplaces by what they actually cost
            you.
          </p>
        </div>

        <nav className="footer-links" aria-label="Footer">
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/auth">Sign In</Link>
          <Link to="/history">History</Link>
        </nav>
      </div>

      <div className="footer-bottom">
        <span>© {year} BlueCart. All rights reserved.</span>
      </div>
    </footer>
  );
}
