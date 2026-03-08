// src/components/Pedal.jsx
import React, { useState, useRef, useEffect } from "react";
import Knobs from "./KnobSelectors.jsx";
import Transport from "./Transport.jsx";
import "./Pedal.css";


const KEYS = ["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"];

const Pedal = ({
   bpm, 
   setBpm, 
   keySig, 
   setKeySig, 
   progression, 
   onGenerate, 
   onSave, 
   genres, 
   subGenres,
   selectedGenreId,
   selectedSubGenreId, 
   onGenreChange, 
   onSubGenreChange }) => {

  const safeKeySig = KEYS.includes(keySig) ? keySig : "C";
  const safeBpm = typeof bpm === "number" ? bpm : 120;

  const [on, setOn] = useState(false);

  const clickRef = useRef(null);

  useEffect(() => {
    clickRef.current = new Audio("/audio/click-80bpm.mp3");
    clickRef.current.loop = true;
  }, []);

  const handleToggle = () => {
    const newState = !on;
    setOn(newState);
   
    if (clickRef.current) {
    if (newState) {
      clickRef.current.currentTime = 0;
      clickRef.current.play();
    } else {
      clickRef.current.pause();
    }
  }

  console.log("Pedal on?", newState);
};

  return (
    <div className="pedal">
      <div className="pedal-head">Punk Pad</div>
      <div className={`pedal-led ${on ? "" : "off"}`}/>

      <div className="pedal-body">
        <div className="pedal-knobs">
          <Knobs
            label="KEY"
            value={Math.max(0, KEYS.indexOf(safeKeySig))}
            min={0}
            max={KEYS.length - 1}
            step={1}
            stops={KEYS.length}
            onChange={(i) => setKeySig(KEYS[i])}
            format={(i) => KEYS[i]}
            size="md"
          />

          <Knobs
            label="BPM"
            value={safeBpm}
            min={80}
            max={300}
            step={1}
            onChange={setBpm}
            size="md"
          />
      </div>

      <Transport
          onSave={onSave}
          progression={progression}
          onGenerate={onGenerate}
          genres={genres}
          subGenres={subGenres}
          selectedGenreId={selectedGenreId}
          selectedSubGenreId={selectedSubGenreId}
          onGenreChange={onGenreChange}
          onSubGenreChange={onSubGenreChange}
        />
      </div>

      <div className="pedal-stomp-wrap">
        <button
          className="pedal-stomp"
          onClick={handleToggle}
          aria-pressed={on}
        >
          {on ? "CLICK ON" : "CLICK OFF"}
        </button>
      </div>
    </div>
  );
};

export default Pedal;
