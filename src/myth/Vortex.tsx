import React from "react";
import { interpolate, random, useCurrentFrame } from "remotion";

const GLYPHS = ["♡", "▶", "↻", "✦", "◐"];

const PARTICLES = new Array(22).fill(0).map((_, i) => ({
  glyph: GLYPHS[i % GLYPHS.length],
  baseR: 60 + random(`vr${i}`) * 220,
  speed: 0.6 + random(`vs${i}`) * 0.8,
  offset: random(`vo${i}`) * Math.PI * 2,
  size: 20 + random(`vz${i}`) * 22,
}));

/** A hypnotic swirling vortex of generic "scroll" glyphs — the myth's stand-in for doomscrolling. */
export const Vortex: React.FC<{ cx: number; cy: number; intensity?: number }> = ({
  cx,
  cy,
  intensity = 1,
}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }}>
      {PARTICLES.map((p, i) => {
        const theta = p.offset + (frame / 40) * p.speed;
        const r = p.baseR * intensity;
        const x = cx + Math.cos(theta) * r;
        const y = cy + Math.sin(theta) * r * 0.55;
        const depth = (Math.sin(theta) + 1) / 2;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              fontSize: p.size * (0.6 + depth * 0.6),
              opacity: 0.25 + depth * 0.5,
              color: "#7d8aa3",
              transform: "translate(-50%,-50%)",
            }}
          >
            {p.glyph}
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: cx,
          top: cy,
          width: 60,
          height: 60,
          marginLeft: -30,
          marginTop: -30,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(125,138,163,0.5) 0%, rgba(125,138,163,0) 70%)",
          opacity: interpolate(intensity, [0, 1], [0, 1]),
        }}
      />
    </div>
  );
};
