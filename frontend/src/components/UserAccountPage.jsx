import React from "react";
import "./Auth.css";

const UserAccountPage = ({ favorites, onDelete, onRename }) => {
  return (
    <div className="auth-page">
      <section className="auth-card">
        <h2 className="auth-title">My Favorite Progressions</h2>

        {favorites.length > 0 ? (
          <ul>
            {favorites.map((prog) => (
              <li key={prog.id} style={{ marginBottom: "10px" }}>
                {prog.name} ({prog.chords.join(" | ")})
                <button
                  type="button"
                  onClick={() => onRename(prog.id)}
                  style={{ marginLeft: "8px" }}
                >
                  Rename
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(prog.id)}
                  style={{ marginLeft: "6px" }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't saved any chord progressions yet!</p>
        )}
      </section>
    </div>
  );
};

export default UserAccountPage;
