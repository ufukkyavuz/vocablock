import React from "react";
import { interpolate } from "remotion";
import { colors } from "../tokens";

const STONE = "#9c8465";
const STONE_DARK = "#6b5842";
const FIGURE = "#f0ece2";

/** Simple flat side-profile traveler silhouette — cloak, staff, no detail beyond iconic shape. */
export const Traveler: React.FC<{ walk?: number; flip?: boolean }> = ({ walk = 0, flip = false }) => {
  const bob = Math.sin(walk / 4) * 4;
  return (
    <svg width={110} height={200} viewBox="0 0 110 200" style={{ transform: flip ? "scaleX(-1)" : undefined }}>
      <g transform={`translate(0, ${bob})`}>
        <circle cx={55} cy={28} r={15} fill={FIGURE} />
        <path d="M35,42 Q55,36 75,42 L86,178 Q55,196 24,178 Z" fill={FIGURE} />
        <line x1={90} y1={55} x2={90} y2={185} stroke={FIGURE} strokeWidth={4} strokeLinecap="round" />
        <circle cx={90} cy={50} r={6} fill={colors.primary} />
      </g>
    </svg>
  );
};

/**
 * The Sphinx — flat iconic silhouette: reclining lion body, fanned wing, crowned head.
 * `awe` (0..1) droops the wing and bows the head as riddles are answered.
 */
export const Sphinx: React.FC<{ awe?: number }> = ({ awe = 0 }) => {
  const wingDroop = interpolate(awe, [0, 1], [0, 34]);
  const headBow = interpolate(awe, [0, 1], [0, 14]);
  return (
    <svg width={420} height={260} viewBox="0 0 420 260">
      {/* wing */}
      <g transform={`rotate(${-wingDroop}, 250, 150)`}>
        <path
          d="M250,150 C270,90 320,60 380,55 C330,80 300,105 285,140 C315,120 350,110 385,112 C340,130 305,150 285,170 Z"
          fill={STONE_DARK}
          opacity={0.9}
        />
      </g>
      {/* body */}
      <ellipse cx={190} cy={185} rx={150} ry={58} fill={STONE} />
      {/* front legs */}
      <rect x={80} y={190} width={22} height={55} rx={8} fill={STONE} />
      <rect x={130} y={196} width={22} height={49} rx={8} fill={STONE_DARK} />
      {/* tail */}
      <path d="M40,190 Q0,170 15,130" stroke={STONE} strokeWidth={10} fill="none" strokeLinecap="round" />
      {/* head + crown */}
      <g transform={`translate(330,110) rotate(${headBow})`}>
        <circle cx={0} cy={0} r={46} fill={STONE} />
        <rect x={-22} y={-64} width={44} height={22} rx={4} fill={colors.primary} />
        <circle cx={16} cy={-6} r={4.5} fill="#1a1410" />
      </g>
    </svg>
  );
};

/**
 * The gate: two columns, a pediment, and a sealed archway. `crack` (0..1)
 * spreads glowing fractures across the archway; `open` (0..1) parts it.
 */
export const Gate: React.FC<{ crack?: number; open?: number }> = ({ crack = 0, open = 0 }) => {
  const doorGap = interpolate(open, [0, 1], [0, 110]);
  const crackOpacity = interpolate(crack, [0, 1], [0, 1]);
  return (
    <svg width={520} height={440} viewBox="0 0 520 440">
      {/* pediment */}
      <polygon points="40,90 260,10 480,90" fill={STONE} />
      <polygon points="60,90 260,32 460,90" fill={STONE_DARK} />
      {/* columns */}
      <rect x={40} y={80} width={56} height={330} fill={STONE} />
      <rect x={424} y={80} width={56} height={330} fill={STONE} />
      <rect x={30} y={70} width={76} height={20} fill={STONE_DARK} />
      <rect x={414} y={70} width={76} height={20} fill={STONE_DARK} />
      {/* archway / doors */}
      <g>
        <rect
          x={96 - doorGap}
          y={90}
          width={164}
          height={300}
          fill="#241d16"
          stroke={STONE_DARK}
          strokeWidth={4}
        />
        <rect
          x={260 + doorGap}
          y={90}
          width={164}
          height={300}
          fill="#241d16"
          stroke={STONE_DARK}
          strokeWidth={4}
        />
        {/* cracks (glow lines) */}
        <g opacity={crackOpacity} stroke={colors.primary} strokeWidth={3} fill="none">
          <path d="M150,110 L175,180 L140,230 L190,300 L160,380" />
          <path d="M340,100 L310,170 L360,220 L320,290 L350,370" />
          <path d="M220,150 L260,200 L230,260" />
        </g>
        <g opacity={crackOpacity * 0.6} stroke={colors.primary} strokeWidth={8} fill="none" style={{ filter: "blur(4px)" }}>
          <path d="M150,110 L175,180 L140,230 L190,300 L160,380" />
          <path d="M340,100 L310,170 L360,220 L320,290 L350,370" />
        </g>
      </g>
    </svg>
  );
};

/** Flat skyline used only in the opening hook beat. */
export const CitySkyline: React.FC = () => (
  <svg width={1080} height={260} viewBox="0 0 1080 260" style={{ display: "block" }}>
    {[
      [0, 120, 90, 140],
      [90, 60, 110, 200],
      [200, 150, 90, 110],
      [290, 40, 130, 220],
      [420, 100, 100, 160],
      [520, 20, 140, 240],
      [660, 90, 100, 170],
      [760, 55, 120, 205],
      [880, 110, 90, 150],
      [970, 70, 110, 190],
    ].map(([x, y, w, h], i) => (
      <rect key={i} x={x} y={260 - h} width={w} height={h} fill="#141c2c" />
    ))}
  </svg>
);
