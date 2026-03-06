import React, { useState, useEffect } from "react";
import Pedal from "./Pedal.jsx";
import Transport from "./Transport.jsx";

const Home = ({ setFavorites }) => {

  const [progression, setProgression] = useState([]);
  const [bpm, setBpm] = useState(142);
  const [keySig, setKeySig] = useState("C");

  const [genres, setGenres] = useState([]);
  const [subGenres, setSubGenres] = useState([]);

  const [selectedGenreId, setSelectedGenreId] = useState("");
  const [selectedSubGenreId, setSelectedSubGenreId] = useState("");

  useEffect(() => {
 fetch("/api/genres")
      .then(res => res.json())
      .then(data => setGenres(data))
.catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (!selectedGenreId) return;

    const fetchSubGenres = async () => {
      const response = await fetch(`/api/genres/${selectedGenreId}/subgenres`);
      const data = await response.json();
      setSubGenres(data);
    };

    fetchSubGenres();
  }, [selectedGenreId]);

  const generateProgression = async () => {
    if (!selectedSubGenreId) {
      alert("Please select a sub-genre first.");
      return;
    }

    try {
      const response = await fetch(`/api/progressions/generate?subGenreId=${selectedSubGenreId}&musicalKey=${keySig}`);

    const data = await response.json();

    setProgression(data);
  
    } catch(error) {
      console.error("Fetch failed:", error);
    }
  };

  const handleSave = async () => {
    if (!progression.length) {
      alert("Please generate a progression first.");
      return;
    }

    const response = await fetch("/api/progressions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Generated Progression",
        musicalKey: keySig, 
      }),
    });

    const saved = await response.json();

    setFavorites(prev => [...prev, saved]);

    alert("Progression saved to favorites!");
  };

  return (
    <main className="container panel-wrap">
      <section className="panel">
        <Pedal
          bpm={bpm}
          setBpm={setBpm}
          keySig={keySig}
          setKeySig={setKeySig}
        />

        <Transport
          onSave={handleSave}
          progression={progression}
          onGenerate={generateProgression}
          genres={genres}
          subGenres={subGenres}
          selectedGenreId={selectedGenreId}
          selectedSubGenreId={selectedSubGenreId}
          onGenreChange={setSelectedGenreId}
          onSubGenreChange={setSelectedSubGenreId}
        />
      </section>
    </main>
  );
};

export default Home;