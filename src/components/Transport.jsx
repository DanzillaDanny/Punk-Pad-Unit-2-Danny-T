import React from "react";
import "./Transport.css";

const Transport = ({
  onSave,
  progression,
  onGenerate,
  genres,
  subGenres,
  selectedGenre,
  selectedSubGenre,
  onGenreChange,
  onSubGenreChange,
}) => {
  // ✅ Guard against undefined/null props
  const safeProgression = Array.isArray(progression) ? progression : [];
  const safeGenres = Array.isArray(genres) ? genres : [];
  const safeSubGenres = Array.isArray(subGenres) ? subGenres : [];

  return (
    <div className="transport-window">
      <div className="chord-display">
        {/* display chords separated or a message if empty */}
        {safeProgression.length ? (
          safeProgression.map((chord, index) => (
            <React.Fragment key={index}>
              <span className="chord-letter">{chord}</span>
              {index < safeProgression.length - 1 && (
                <span className="chord-separator">|</span>
              )}
            </React.Fragment>
          ))
        ) : (
          // could also show a message here instead of [] if you want
          <span className="chord-empty">No chords yet</span>
        )}
      </div>

      {/* manages transport layout (header controls) */}
      <div className="transport-header-controls">
        <div className="genre-controls">
          {/* main genre dropdown */}
          <select
            value={selectedGenre || ""}
            onChange={(e) => onGenreChange && onGenreChange(e.target.value)}
          >
            {safeGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          {/* Sub-Genre Dropdown */}
          <select
            value={selectedSubGenre || ""}
            onChange={(e) =>
              onSubGenreChange && onSubGenreChange(e.target.value)
            }
            disabled={!selectedGenre}
          >
            {safeSubGenres.map((subGenre) => (
              <option key={subGenre} value={subGenre}>
                {subGenre}
              </option>
            ))}
          </select>
        </div>

        <div className="center-generate-control">
          <button onClick={onGenerate} className="transport-btn">
            Generate Chords
          </button>
        </div>

        <div className="control-buttons">
          <button onClick={onSave} className="transport-btn">
            Add To Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transport;
