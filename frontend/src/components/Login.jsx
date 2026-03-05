// src/components/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    console.log("Login submitted:", { email, password });
    navigate("/"); 
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
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="auth-submit">
            Log In
          </button>
        </form>

        <p className="auth-footer">
          No account?
          <Link to="/Signup" className="auth-link">
            Create Account
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Login;
