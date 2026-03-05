import React, { useMemo, useRef, useState } from "react";
import "./KnobSelectors.css";


const Knobs = ({
    value,
    min,
    max,
    step = 1,
    onChange,
    onChangeEnd,
    size = "md",
    label,
    stops,
    format,
    angleMin = -135,
    angleMax = 135,
    disabled = false,
}) => {
    const clamp = (v) => Math.min(max, Math.max(min,v));
    const roundToStep = (v) => Math.round(v / step) * step;
// percent across range
    const pct = (clamp(value) - min) / Math.max(1, (max-min));
    const angleRange = angleMax - angleMin;
    const rawAngle = angleMin + pct * angleRange;
//snap the indicator to the discrete stops if provided.
    const indicatorAngle = useMemo(() => {
        if (!stops || stops < 2) return rawAngle;
        const inc = angleRange / (stops -1);
        return Math.round((rawAngle - angleMin) / inc) * inc + angleMin;
}, [rawAngle, angleMin, angleRange, stops]);
//dragging
const [dragging, setDragging] = useState(false);
const startRef = useRef({ y: 0, v: value });
//Adjust for sensitivity (px to sweep entire range)
const sweepPx = 150;

const setFromDelta = (dy) => {
    // Drag up to increase the value.
    const delta = -(dy / sweepPx) * (max-min);
    let next = startRef.current.v + delta;
    next = roundToStep(clamp(next));

    // If discrete detents, snap to nearest stop value across [min..max]
    if (stops && stops > 1) {
        const stepSize = (max-min) / (stops -1);
        const snappedIdx = Math.round((next - min) / stepSize);
        next = min + snappedIdx * stepSize;
    }

    onChange(next);
};

// Mouse
const onMouseDown = (e) => {
    if (disabled) return;
    e.preventDefault();
    setDragging(true);
    startRef.current= {y: e.clientY, v: value };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
};
const onMouseMove = (e) => setFromDelta(e.clientY -startRef.current.y);
const onMouseUp = () => {
    setDragging(false);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    onChangeEnd && onChangeEnd();
};

//Touch
const onTouchStart = (e) => {
    if (disabled) return;
    const t = e.touches[0];
    setDragging(true);
    startRef.current = {y: t.clientY, v: value};
};
const onTouchMove = (e) => {
    const t = e.touches[0];
    setFromDelta(t.clientY -startRef.current.y);
};
const onTouchEnd = () => {
  setDragging(false);
  onChangeEnd && onChangeEnd();
};

// Keyboard
const onKeyDown = (e) => {
    if(disabled) return;
    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
        e.preventDefault();
        onChange(clamp(roundToStep(value +step)));
    } else if (e.key === "End") {
        e.preventDefault();
        onChange(max);
    }
};

return (
    <div className={`pp-knob-wrap pp-knob--${size}`}>
        {label && <div className="pp-knob-label">{label}</div>}

        <div
        role="slider"
        aria-label={label || "knob"}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={onKeyDown}
        className={[
            "pp-knob",
            disabled ? "pp-knob--disabled" : "",
            dragging ? "pp-knob--drag" : "",
        ].join(" ").trim()}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{["--pp-knob-angle"]:`${indicatorAngle}deg`}}
    >
        <div className="pp-knob-face" />
        <div className="pp-knob-indicator" />
        </div>

        <div className="pp-knob-value">
            {format ? format(value) : value}
        </div>
        </div>
    );
}

export default Knobs;
