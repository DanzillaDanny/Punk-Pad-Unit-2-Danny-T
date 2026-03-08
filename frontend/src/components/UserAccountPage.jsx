import React, { useState, useRef } from "react";
import "./Auth.css";

const UserAccountPage = ({ favorites, onDelete, onRename, onReorder, currentUser }) => {
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const dragIndex = useRef(null);

  const startRename = (prog) => {
    setRenamingId(prog.id);
    setRenameValue(prog.name || "");
  };

  const commitRename = (id) => {
    onRename(id, renameValue);
    setRenamingId(null);
    setRenameValue("");
  };

  const handleRenameKeyDown = (e, id) => {
    if (e.key === "Enter") commitRename(id);
    if (e.key === "Escape") { setRenamingId(null); setRenameValue(""); }
  };

  const handleDragStart = (index) => {
    dragIndex.current = index;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    const from = dragIndex.current;
    if (from === null || from === index) return;
    const newOrder = [...favorites];
    const [moved] = newOrder.splice(from, 1);
    newOrder.splice(index, 0, moved);
    onReorder(newOrder);
    dragIndex.current = null;
  };

  return (
    <div className="auth-page">
      <section className="auth-card">
        <h2 className="auth-title">
          {currentUser ? `${currentUser.name}'s` : "My"} Favorite Progressions
        </h2>

        {favorites.length > 0 ? (
          <ul>
            {favorites.map((prog, index) => (
              <li
                key={prog.id}
                style={{ marginBottom: "10px", cursor: "grab" }}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={() => handleDrop(index)}
              >
                {renamingId === prog.id ? (
                  <input
                    autoFocus
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onBlur={() => commitRename(prog.id)}
                    onKeyDown={(e) => handleRenameKeyDown(e, prog.id)}
                    style={{ marginRight: "8px" }}
                  />
                ) : (
                  <span>{prog.name} ({prog.chords ? prog.chords.join(" | ") : ""})</span>
                )}
                <button
                  type="button"
                  onClick={() => startRename(prog)}
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

