// Pop-punk / emo templates
const PopPunkData = {
  PopPunk: [
    ["I", "V", "vi", "IV"],
    ["I", "IV", "V", "vi"],
    ["I", "IV", "V"],
    ["vi", "IV", "I", "V"],
    ["I", "vi", "IV", "V"],
    ["I", "V", "bVII", "IV"],
    ["I", "bVII", "IV", "V"],
    ["I", "vi", "ii", "V"],
    ["IV", "V", "I"],
  ],
  EmoPop: [
    ["vi", "IV", "I", "V"],
    ["vi", "V", "IV", "I"],
    ["I", "II", "V"],
    ["I", "V", "vi", "iii", "IV"],
    ["IV", "I", "V", "vi"],
    ["i", "bVI", "bIII", "bVII"],
  ],
  ModernRevival: [
    ["I", "V", "vi", "bVII"],
    ["I", "V", "bVII", "IV"],
    ["vi", "IV", "I", "V"],
    ["I", "bVII", "IV", "V"],
    ["I", "V", "vi", "iii"],
    ["i", "bVII", "bVI", "bVII"],
  ],
};

// Punk templates
const PunkData = {
  classic_70s: [
    ["I", "IV", "V"],
    ["I", "bVII", "IV"],
    ["I", "bVII", "IV", "V"],
    ["I", "bVII"],
  ],
  hardcore_80s: [
    ["I", "bVII", "IV", "V"],
    ["i", "bVI", "bVII"],
    ["I", "bVII"],
    ["i", "bVII", "bVI", "bVII"],
  ],
  skate_90s: [
    ["I", "V", "bVII", "IV"],
    ["I", "IV", "V", "bVII"],
    ["vi", "bVII", "I", "IV"],
    ["I", "bVII", "IV"],
  ],
  dark_punk: [
    ["i", "bVII", "bVI", "bVII"],
    ["i", "bVI", "bIII", "bVII"],
    ["i", "bVII", "IV"],
    ["i", "bVI", "bVII", "IV"],
  ],
};

const CHORD_TEMPLATES = {
  "Pop Punk": PopPunkData,
  "Punk": PunkData,
};

export default CHORD_TEMPLATES;