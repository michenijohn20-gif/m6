import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login, register } from "../store/authSlice";
import "../styles/auth.css";

export default function AuthPage() {
  const [mode, setMode] = useState("signin"); // signin | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const isSignIn = mode === "signin";
  const isLoading = status === "loading";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const action = isSignIn ? login : register;
    const result = await dispatch(action({ email, password }));
    if (action.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-tabs">
          <button
            type="button"
            className={isSignIn ? "auth-tab active" : "auth-tab"}
            onClick={() => setMode("signin")}
          >
            Sign In
          </button>
          <button
            type="button"
            className={!isSignIn ? "auth-tab active" : "auth-tab"}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        <p className="auth-subtitle">
          {isSignIn
            ? "Welcome back, sign in to see your search history."
            : "Create an account to save your search history."}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-field">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label className="auth-field">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={6}
              required
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit" disabled={isLoading}>
            {isLoading ? "Please wait..." : isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {isSignIn && (
          <div className="auth-forgot">
            <Link to="/forgot-password" className="auth-forgot-link">
              Forgot your password?
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
