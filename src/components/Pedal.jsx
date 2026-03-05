// src/components/Pedal.jsx
import React, { useState } from "react";
import Knobs from "./KnobSelectors.jsx";
import "./Pedal.css";

const KEYS = ["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"];

const Pedal = ({ bpm, setBpm, keySig, setKeySig }) => {
  // make sure props won't blow us up
  const safeKeySig = KEYS.includes(keySig) ? keySig : "C";
  const safeBpm = typeof bpm === "number" ? bpm : 120;

  const [on, setOn] = useState(true);

  const handleToggle = () => {
    setOn((prev) => !prev);
    console.log("Pedal on?", !on);
  };

  return (
    <div className="pedal">
      <div className="pedal-head">Punk Pad</div>

      <div className="pedal-body">
        <div className="pedal-knobs">
          <Knobs
            label="Key"
            value={Math.max(0, KEYS.indexOf(safeKeySig))}
            min={0}
            max={KEYS.length - 1}
            step={1}
            stops={KEYS.length}
            onChange={(i) => setKeySig && setKeySig(KEYS[i])}
            format={(i) => KEYS[i]}
            size="md"
          />

          <Knobs
            label="BPM"
            value={safeBpm}
            min={80}
            max={300}
            step={1}
            onChange={setBpm || (() => {})}
            size="md"
          />
        </div>
      </div>

      {/* LED hooked to `on` */}
      <div className={`pedal-led ${on ? "" : "off"}`} />

      {/* Simple stomp button – NO image for now */}
      <div className="pedal-stomp-wrap">
        <button
          type="button"
          className="pedal-stomp"
          onClick={handleToggle}
          aria-pressed={on}
        >
          {on ? "ON" : "OFF"}
        </button>
      </div>
    </div>
  );
};

export default Pedal;
