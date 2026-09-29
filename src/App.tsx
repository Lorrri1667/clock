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
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#d8dae3" }}>
      <svg
        width="340"
        height="340"
        viewBox="0 0 474 475"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: "90vw", maxHeight: "90vw", filter: "drop-shadow(-6px -7px 20px rgba(255,255,255,0.5)) drop-shadow(8px 8px 20px rgba(170,170,170,0.25))" }}
      >
        {/* Clock face */}
        <circle cx={cx} cy={cy} r="210" fill="#EAECF3" />
        <circle cx={cx} cy={cy} r="209.5" stroke="#3F3F3F" strokeOpacity="0.1" />

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
