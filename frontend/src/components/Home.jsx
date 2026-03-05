import React, { useState, useEffect, useMemo } from "react";
import Pedal from "./Pedal.jsx";
import Transport from "./Transport.jsx";
import CHORD_TEMPLATES from "./ChordTemplates.jsx";
import RomanToChord from "./Theory.jsx";

//the logic flow of the home page lives here so I can just use App.jsx for routing

const Home = ({setFavorites}) => {
  //state management (useState, useEffect, useMemo)
  const initialGenreKey = Object.keys(CHORD_TEMPLATES)[0];
  const [progression, setProgression] = useState([]);
  const [bpm, setBpm] = useState(142);
  const [keySig, setKeySig] = useState("C");
  const [selectedGenre, setSelectedGenre] = useState(initialGenreKey);
  const [selectedSubGenre, setSelectedSubGenre] = useState('');
  
  //subGenres useMemo and useEffect logic
    const subGenres = useMemo(() => {
    return CHORD_TEMPLATES[selectedGenre] || {};
  }, [selectedGenre]);

  useEffect(() => {
    const firstSubGenreKey = Object.keys(subGenres) [0];
    if (firstSubGenreKey) {
      setSelectedSubGenre(firstSubGenreKey);
    } else {
      setSelectedSubGenre('');
    }
  }, [selectedGenre, subGenres]);

  // handleSave function defined in the correct scope
  const handleSave = () => {
    if (progression.length === 0 || typeof progression === 'string' || progression.includes('Select a valid')) {
        alert("Please generate a valid progression first.");
        return;
    }

    const newFavorite = {
        id: Date.now(), 
        name: `${selectedGenre} - ${selectedSubGenre} in ${keySig}`, 
        chords: progression 
    };
    
    setFavorites(prevFavorites => [...prevFavorites, newFavorite]); 
    alert("Progression added to favorites!");
    console.log("Saving this object:", newFavorite);
  };
  
  // generateProgression function defined in the correct scope
  const generateProgression = () => {
    if (selectedSubGenre && subGenres[selectedSubGenre]) {
      const templates = subGenres[selectedSubGenre];
      const randomIndex = Math.floor(Math.random() * templates.length);
            
      // Get the raw Roman numeral progression
      const romanProgression = templates[randomIndex];
      
      // Convert the Roman numerals to actual chord letters
      const chordLetters = romanProgression.map(roman => RomanToChord(roman, keySig));
      
      // Update the state with the final result
      setProgression(chordLetters);
      
    } else {
      setProgression(["Select a valid genre/sub-genre"]);
    }
  };  

return (
    <main className="container panel-wrap">
      <section className="panel">
        <Pedal bpm={bpm} setBpm={setBpm} keySig={keySig} setKeySig={setKeySig} />
        <Transport
          onSave={handleSave} // Passed Save handler correctly
          progression={progression}
          onGenerate={generateProgression}
          genres={Object.keys(CHORD_TEMPLATES)}
          subGenres={Object.keys(subGenres)}
          selectedGenre={selectedGenre}
          selectedSubGenre={selectedSubGenre}
          onGenreChange={setSelectedGenre}
          onSubGenreChange={setSelectedSubGenre}
        />
      </section>
    </main>
  );
};

export default Home;
