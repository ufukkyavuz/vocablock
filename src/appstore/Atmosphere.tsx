import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, fonts } from "../tokens";
import { SHOT_HEIGHT, SHOT_WIDTH } from "./config";

/**
 * The lit ground every frame sits on.
 *
 * A flat fill makes a device mockup look pasted on. Stacking a bloom behind
 * where the phone sits, a lime haze off to one side, and a cool falloff at the
 * corners gives the phone something to be lit by, and keeps the whole set
 * reading as one photograph rather than eight slides.
 */
export const Ground: React.FC = () => (
  <>
    {/* Deep enough at the edges that a light app screen still has an edge to
        sit against — most of these screens are near-white, so a pale ground
        would let the device dissolve into it. */}
    <AbsoluteFill style={{ background: "#aebec2" }} />
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 1250px 1400px at 50% 30%, #ffffff 0%, rgba(255,255,255,0.92) 30%, rgba(255,255,255,0.42) 60%, rgba(255,255,255,0) 82%)`,
      }}
    />
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 760px 660px at 86% 66%, rgba(162,240,35,0.3), transparent 62%)`,
      }}
    />
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 800px 660px at 10% 72%, rgba(118,176,208,0.42), transparent 64%)`,
      }}
    />
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 780px 560px at 6% 4%, rgba(168,206,222,0.5), transparent 72%)`,
      }}
    />
    {/* Corner falloff — stops the bloom reading as a flat white rectangle. */}
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 1200px 1500px at 50% 40%, transparent 50%, rgba(60,86,88,0.3) 100%)`,
      }}
    />
  </>
);

/* ------------------------------------------------------------------ */

const mulberry32 = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

type ShardSpec = {
  x: number;
  y: number;
  size: number;
  letter: string | null;
  rx: number;
  ry: number;
  rz: number;
  blur: number;
  opacity: number;
  lime: boolean;
};

/**
 * Vocabulary is the material this product is made of, so the debris drifting
 * around the phone is lettering rather than the mineral chips the category's
 * best-known gallery uses. Positions are seeded per frame so a shot renders
 * identically every time, and blur varies by depth so the field reads as
 * having a focal plane.
 */
// The device spans nearly the full frame width, so shards are pinned to the
// outer margins. Anything drifting across the middle lands on top of live UI
// and reads as a smudge rather than as an object in the air.
const MARGIN = 190;

const buildShards = (seed: number, layer: "back" | "front"): ShardSpec[] => {
  const rand = mulberry32(seed * 977 + (layer === "front" ? 31 : 7));
  const letters = "EPHMRALTUSC".split("");
  const count = layer === "front" ? 2 : 3;
  const bandTop = 640;
  const bandHeight = SHOT_HEIGHT - 820;

  return Array.from({ length: count }, (_, i) => {
    const left = i % 2 === 0;
    const near = layer === "front";
    const size = near ? 104 + rand() * 76 : 62 + rand() * 62;
    const x = left ? -size * 0.3 + rand() * MARGIN : SHOT_WIDTH - MARGIN + rand() * MARGIN;
    // One shard per horizontal band, so they never bunch into a clump.
    const y = bandTop + ((i + rand() * 0.7) / count) * bandHeight;

    return {
      x,
      y,
      size,
      letter: rand() > 0.28 ? letters[Math.floor(rand() * letters.length)] : null,
      rx: rand() * 50 - 25,
      ry: rand() * 60 - 30,
      rz: rand() * 56 - 28,
      blur: near ? 3 + rand() * 5 : rand() < 0.75 ? 0 : 1 + rand() * 2,
      opacity: near ? 0.9 + rand() * 0.1 : 1,
      lime: rand() < 0.28,
    };
  });
};

const Shard: React.FC<{ s: ShardSpec }> = ({ s }) => (
  <div
    style={{
      position: "absolute",
      left: s.x,
      top: s.y,
      width: s.size,
      height: s.size,
      opacity: s.opacity,
      filter: s.blur ? `blur(${s.blur}px)` : undefined,
      transform: `perspective(900px) rotateX(${s.rx}deg) rotateY(${s.ry}deg) rotateZ(${s.rz}deg)`,
    }}
  >
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "28%",
        background: s.lime
          ? `linear-gradient(145deg, #c9ff5e 0%, ${colors.primary} 45%, #6fae08 100%)`
          : "linear-gradient(145deg, #ffffff 0%, #f4f9e8 42%, #cfe0b4 100%)",
        border: "1px solid rgba(255,255,255,0.95)",
        boxShadow: `0 ${s.size * 0.18}px ${s.size * 0.36}px rgba(28,48,22,0.34), inset 0 2px 0 rgba(255,255,255,1), inset 0 -3px 8px rgba(120,150,90,0.22)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: fonts.ui,
        fontWeight: 800,
        fontSize: s.size * 0.56,
        color: s.lime ? "rgba(14,22,37,0.78)" : "rgba(14,22,37,0.5)",
      }}
    >
      {s.letter}
    </div>
  </div>
);

export const Shards: React.FC<{ seed: number; layer: "back" | "front" }> = ({
  seed,
  layer,
}) => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    {buildShards(seed, layer).map((s, i) => (
      <Shard key={i} s={s} />
    ))}
  </AbsoluteFill>
);
