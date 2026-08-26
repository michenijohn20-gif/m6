import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/auth.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="auth-subtitle">
          Enter your email and we'll send you a link to reset your password.
        </p>

        {sent ? (
          <p className="auth-forgot-success">
            If an account exists for {email}, a reset link is on its way.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <label className="auth-field">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>

            <button type="submit" className="auth-submit">
              Send reset link
            </button>
          </form>
        )}

        <Link to="/auth" className="auth-back-link">
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
