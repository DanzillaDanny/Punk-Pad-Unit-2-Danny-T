import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./layout/Header.jsx";
import Footer from "./layout/Footer.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import UserAccountPage from "./components/UserAccountPage.jsx";


const App = () => {
const [currentUser, setCurrentUser] = useState(null);
const [favorites, setFavorites] = useState([]);

useEffect(() => {
  fetch("/api/auth/me", { credentials: "include" })
    .then(res => res.ok ? res.json() : null)
    .then(user => { if (user) setCurrentUser(user); })
    .catch(() => {});
}, []);

const handleDeleteFavorite = (id) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
  };

  const handleRenameFavorite = (id) => {
  
    const newName = prompt("Enter a new name for this progression:");
    if (newName && newName.trim() !== "") {
        const updatedFavorites = favorites.map(fav => {
            if (fav.id === id) {
                return { ...fav, name: newName.trim() };
            }
            return fav;
        });
        setFavorites(updatedFavorites);
    }
  };

  return (
  <Router>
    <div className="page">
      <Header />
        <Routes>
        <Route
          path="/"
          element={
          <Home
            favorites={favorites}
            setFavorites={setFavorites}
            currentUser={currentUser}
           />
        }
      />
        <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={<Login onLogin={setCurrentUser} />}
          />
            <Route
            path="/signup"
            element={<Signup setCurrentUser={setCurrentUser} />}
          />
            <Route
              path="/UserAccountPage"
              element={
            <UserAccountPage
              favorites={favorites}
              setFavorites={setFavorites}
              onDelete={handleDeleteFavorite}
              onRename={handleRenameFavorite}
              currentUser={currentUser}
            />
           }
          />   
          </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
