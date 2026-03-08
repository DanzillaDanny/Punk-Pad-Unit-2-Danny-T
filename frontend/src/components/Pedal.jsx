import React, { useState, useEffect, useRef } from "react";
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
  onSubGenreChange,
  statusMsg,
}) => {

  const safeKeySig = KEYS.includes(keySig) ? keySig : "C";
  const safeBpm = typeof bpm === "number" ? bpm : 120;

  const [metronomeOn, setMetronomeOn] = useState(false);

  const audioCtxRef = useRef(null);
  const audioBufferRef = useRef(null);
  const intervalRef = useRef(null);
  const activeSourceRef = useRef(null);

  // Load audio buffer once on mount
  useEffect(() => {
    let ctx;

    const load = async () => {
      try {
        const { default: clickSrc } = await import("./assets/click 80bpm.mp3");

        ctx = new (window.AudioContext || window.webkitAudioContext)();
        audioCtxRef.current = ctx;

        const res = await fetch(clickSrc);
        const arrayBuf = await res.arrayBuffer();
        audioBufferRef.current = await ctx.decodeAudioData(arrayBuf);

      } catch {
        // audio file not yet placed; metronome runs silently
      }
    };

    load();

    return () => {
      if (ctx) {
        ctx.close();
      }
    };
  }, []);

  const tick = () => {
    const ctx = audioCtxRef.current;
    const buf = audioBufferRef.current;

    if (ctx && buf) {
      if (activeSourceRef.current) {
        try {
          activeSourceRef.current.stop();
        } catch {
          // ignore if already stopped
        }
        activeSourceRef.current = null;
      }

      const source = ctx.createBufferSource();
      source.buffer = buf;
      source.connect(ctx.destination);
      source.start();

      activeSourceRef.current = source;
    }
  };

  // Toggle metronome on/off
  useEffect(() => {
    if (!metronomeOn) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;

      if (activeSourceRef.current) {
        try {
          activeSourceRef.current.stop();
        } catch {
          // ignore if already stopped
        }
        activeSourceRef.current = null;
      }

      return;
    }

    tick();
    intervalRef.current = setInterval(tick, 60000 / safeBpm);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;

      if (activeSourceRef.current) {
        try {
          activeSourceRef.current.stop();
        } catch {
          // ignore if already stopped
        }
        activeSourceRef.current = null;
      }
    };
  }, [metronomeOn]); // eslint-disable-line react-hooks/exhaustive-deps

  // BPM change — reschedule interval
  useEffect(() => {
    if (!metronomeOn) return;

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(tick, 60000 / safeBpm);

    return () => clearInterval(intervalRef.current);
  }, [safeBpm]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleToggle = () => {
    setMetronomeOn(prev => !prev);
  };

  return (
    <div className="pedal">
      <div className="pedal-head">Punk Pad</div>

      <div className={`pedal-led ${metronomeOn ? "" : "off"}`} />

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
          statusMsg={statusMsg}
        />

      </div>

      <div className="pedal-stomp-wrap">
        <button
          className="pedal-stomp"
          onClick={handleToggle}
          aria-pressed={metronomeOn}
        >
          {metronomeOn ? "CLICK ON" : "CLICK OFF"}
        </button>
      </div>

    </div>
  );
};

export default Pedal;
