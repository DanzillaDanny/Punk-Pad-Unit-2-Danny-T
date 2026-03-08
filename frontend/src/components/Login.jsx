import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const HARDCODED_EMAIL = "punk@punk.com";
const HARDCODED_PASSWORD = "punk1234";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

 try {
    const response = await fetch("/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: email
      })
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const user = await response.json();

    onLogin(user);
    navigate("/UserAccountPage");

  } catch (err) {
    console.error(err);
    setAuthError("Login failed.");
  }
}

  return (
    <div className="auth-page">
      <section className="auth-card">
        <h2 className="auth-title">Log In</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input
              type="email"
              id="login-email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setAuthError(""); }}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setAuthError(""); }}
              required
              minLength={6}
            />
          </div>

          {authError && <p className="auth-error">{authError}</p>}

          <button type="submit" className="auth-submit">
            Log In
          </button>
        </form>

        <p className="auth-footer">
          No account?
          <Link to="/signup" className="auth-link">
            Create Account
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Login;