import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { requestLogin } from "../services/authService";

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const checkAuth = async () => {
      try {

        const res = await fetch("/api/auth/me", {
          credentials: "include"
        });

        if (res.ok) {
          const user = await res.json();
          setCurrentUser(user);
        }

      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username) => {
    const user = await requestLogin(username);
    setCurrentUser(user);
  };

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include"
    });

    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}