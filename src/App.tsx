import { useEffect, useState } from "react";

function getAngles() {
  const now = new Date();
  const s = now.getSeconds() + now.getMilliseconds() / 1000;
  const m = now.getMinutes() + s / 60;
  const h = (now.getHours() % 12) + m / 60;
  return {
    sec: (s / 60) * 360,
    min: (m / 60) * 360,
    hour: (h / 12) * 360,
  };
}

export default function App() {
  const [angles, setAngles] = useState(getAngles);

  useEffect(() => {
    const id = setInterval(() => setAngles(getAngles()), 50);
    return () => clearInterval(id);
  }, []);

  const cx = 236;
  const cy = 237;
  const rot = (deg: number) => `rotate(${deg}, ${cx}, ${cy})`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#d8dae3]">
      <svg
        width="340"
        height="340"
        viewBox="0 0 474 475"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: "90vw", maxHeight: "90vw" }}
      >
        <defs>
          <filter id="clock-shadow" x="0" y="0" width="474" height="475" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dx="-6" dy="-7" />
            <feGaussianBlur stdDeviation="10" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dx="8" dy="8" />
            <feGaussianBlur stdDeviation="10" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.666667 0 0 0 0 0.666667 0 0 0 0 0.666667 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect3_innerShadow" />
            <feOffset dx="5" dy="7" />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.65 0 0 0 0 0.65 0 0 0 0 0.65 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="shape" result="effect3_innerShadow" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feMorphology radius="2" operator="erode" in="SourceAlpha" result="effect4_innerShadow" />
            <feOffset dx="-6" dy="-1" />
            <feGaussianBlur stdDeviation="5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
            <feBlend mode="normal" in2="effect4_innerShadow" result="effect4_innerShadow" />
          </filter>
        </defs>

        {/* Clock face */}
        <g filter="url(#clock-shadow)">
          <circle cx={cx} cy={cy} r="210" fill="#EAECF3" />
          <circle cx={cx} cy={cy} r="209.5" stroke="#3F3F3F" strokeOpacity="0.1" />
        </g>

        {/* Hour tick marks */}
        <line x1="237" y1="59" x2="237" y2="99" stroke="#9E9FA6" strokeWidth="2" />
        <line x1="237" y1="366" x2="237" y2="406" stroke="#9E9FA6" strokeWidth="2" />
        <line x1="361" y1="236" x2="401" y2="236" stroke="#9E9FA6" strokeWidth="2" />
        <line x1="63" y1="236" x2="103" y2="236" stroke="#9E9FA6" strokeWidth="2" />

        {/* Hour hand */}
        <line
          x1={cx} y1={cy}
          x2={cx} y2={cy - 118}
          stroke="black"
          strokeWidth="5"
          strokeLinecap="round"
          transform={rot(angles.hour)}
        />

        {/* Minute hand */}
        <line
          x1={cx} y1={cy}
          x2={cx} y2={cy - 155}
          stroke="black"
          strokeWidth="5"
          strokeLinecap="round"
          transform={rot(angles.min)}
        />

        {/* Second hand */}
        <line
          x1={cx} y1={cy + 38}
          x2={cx} y2={cy - 170}
          stroke="#3F3DB6"
          strokeWidth="2"
          strokeLinecap="round"
          transform={rot(angles.sec)}
        />

        {/* Center dot */}
        <circle cx={cx} cy={cy} r="12" fill="#3F3DB6" stroke="white" strokeWidth="4" />
      </svg>
    </div>
  );
}
