import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../store/authSlice";
import "../styles/navbar.css";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          BlueCart
        </Link>

        <div className="navbar-search">
          <SearchBar placeholder="Search for your product..." />
        </div>

        <div className="navbar-actions">
          {email && (
            <Link to="/history" className="navbar-link-plain">
              History
            </Link>
          )}
          {email ? (
            <>
              <span className="navbar-user">Hi, {email.split("@")[0]}</span>
              <button
                type="button"
                className="navbar-link"
                onClick={() => dispatch(logout())}
              >
                Log out
              </button>
            </>
          ) : (
            <Link to="/auth" className="navbar-signin">
              Sign In
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                <path
                  d="M9 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
