// src/components/Signup.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }

    console.log("Signup submitted:", { email, password });

  }

  return (
    <div className="auth-page">
      <section className="auth-card">
        <h2 className="auth-title">Create Account</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="signup-email">Email</label>
            <input
              type="email"
              id="signup-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="signup-password">Password</label>
            <input
              type="password"
              id="signup-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label htmlFor="signup-confirm">Confirm Password</label>
            <input
              type="password"
              id="signup-confirm"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="auth-submit">
            Sign Up
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?
          <Link to="/Login" className="auth-link">
            Log in
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Signup;

