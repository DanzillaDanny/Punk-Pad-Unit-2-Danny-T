import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const DEMO_USERS = ["danny"];

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setAuthError("");

    const trimmed = username.trim();
    if (!trimmed) {
      setAuthError("Please enter a username")
      return;
    }

setLoading(true);
 try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      credentials: "include",
      body: JSON.stringify({ username: trimmed }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error ||"Login failed");
    }

    const user = await response.json();
    onLogin(user);
    navigate("/UserAccountPage");
  } catch (err) {
    console.error(err);
    setAuthError(err.message || "Login failed.");
  } finally {
    setLoading(false);
  }
}

return (
    <div className="auth-page">
      <section className="auth-card">
        <h2 className="auth-title">Log In</h2>

        {/* Quick-pick demo users */}
        <div className="demo-users">
          <p className="demo-label">Quick demo login:</p>
          <div className="demo-buttons">
            {DEMO_USERS.map((name) => (
              <button
                key={name}
                type="button"
                className="demo-user-btn"
                onClick={() => { setUsername(name); setAuthError(""); }}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="login-username">Username</label>
            <input
              type="text"
              id="login-username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setAuthError(""); }}
              placeholder="Enter any username..."
              required
              autoComplete="off"
            />
          </div>

          {authError && <p className="auth-error">{authError}</p>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="auth-footer">
          No account?{" "}
          <Link to="/signup" className="auth-link">
            Create Account
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Login;