import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../store/authSlice";
import "../styles/navbar.css";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);

  return (
    <nav className="navbar">
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
          <Link to="/auth" className="navbar-link">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
