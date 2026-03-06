import React from "react";
import "./Transport.css";

const Transport = ({
  onSave,
  progression,
  onGenerate,
  genres,
  subGenres,
  selectedGenreId,
  selectedSubGenreId,
  onGenreChange,
  onSubGenreChange,
}) => {
  // Guard against undefined/null props
  const safeProgression = Array.isArray(progression) ? progression : [];
  const safeGenres = Array.isArray(genres) ? genres : [];
  const safeSubGenres = Array.isArray(subGenres) ? subGenres : [];

  console.log("GENRES RECEIVED:", safeGenres);

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
   
          <span className="chord-empty">No chords yet</span>
        )}
      </div>

      {/* manages transport layout (header controls) */}
      <div className="transport-header-controls">
        <div className="genre-controls">
          {/* main genre dropdown */}
          <select
            value={selectedGenreId || ""}
            onChange={(e) => onGenreChange && onGenreChange(Number(e.target.value))}
          >
            <option value="">Select Genre</option>
            {safeGenres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          {/* Sub-Genre Dropdown */}
          <select
            value={selectedSubGenreId || ""}
            onChange={(e) =>
              onSubGenreChange && onSubGenreChange(e.target.value)
            }
            disabled={!selectedGenreId}
          >
            <option value="">Select Sub-Genre</option>
            {safeSubGenres.map((subGenre) => (
              <option key={subGenre.id} value={subGenre.id}>
                {subGenre.name}
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

