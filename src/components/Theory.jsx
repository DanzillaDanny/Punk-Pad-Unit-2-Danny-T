const KEYS_SHARP = ["C","G","D","A","E","B","F#","C#"];
const SCALE_SHARP = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const SCALE_FLAT  = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"];

const DEGREE = { "I":0, "ii":1, "II":1, "iii":2, "III":2, "IV":3, "iv":3, "V":4, "v":4, "vi":5, "VI":5, "vii°":6, "VII":6 };

const RomanToChord = (roman, key) => {
  const useSharp = KEYS_SHARP.includes(key);
  const chroma = useSharp ? SCALE_SHARP : SCALE_FLAT;
  // major scale steps in semitones from tonic
  const STEPS = [0,2,4,5,7,9,11];
  const tonicIndex = chroma.indexOf(key);
  if (tonicIndex < 0) return key;
  const d = DEGREE[roman.replace(/\s+/g, "")] ?? 0;
  const pitch = chroma[(tonicIndex + STEPS[d]) % 12];
  const isMinor = roman === roman.toLowerCase() || /°/.test(roman);
  const quality = /°/.test(roman) ? "dim" : (isMinor ? "m" : "");
  return `${pitch}${quality}`;
}

export default RomanToChord;