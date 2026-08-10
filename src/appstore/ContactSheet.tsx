import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, fonts } from "../tokens";
import { SHOT_HEIGHT, SHOT_WIDTH, shots } from "./config";
import { shotComponents } from "./Shots";

export const SHEET_WIDTH = 1680;
export const SHEET_HEIGHT = 1180;

/**
 * Legibility check, not a deliverable.
 *
 * A caption that only works on a 27" monitor is not ready — the decision is
 * usually made against a search-result thumbnail. The top row is rendered at
 * the ~150px width a search result gets; the bottom row at product-page size.
 */
const Thumb: React.FC<{ width: number; index: number }> = ({ width, index }) => {
  const scale = width / SHOT_WIDTH;
  const shot = shots[index];
  const Component = shotComponents[shot.compositionId as keyof typeof shotComponents];
  return (
    <div
      style={{
        width,
        height: SHOT_HEIGHT * scale,
        overflow: "hidden",
        borderRadius: Math.max(6, width * 0.05),
        position: "relative",
        boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: SHOT_WIDTH,
          height: SHOT_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "absolute",
        }}
      >
        <Component />
      </div>
    </div>
  );
};

const Row: React.FC<{ label: string; width: number; count: number }> = ({
  label,
  width,
  count,
}) => (
  <div>
    <div
      style={{
        fontFamily: fonts.mono,
        fontSize: 14,
        letterSpacing: 1.6,
        color: colors.textMuted,
        marginBottom: 14,
      }}
    >
      {label}
    </div>
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      {Array.from({ length: count }, (_, i) => (
        <Thumb key={i} width={width} index={i} />
      ))}
    </div>
  </div>
);

export const ContactSheet: React.FC = () => (
  <AbsoluteFill
    style={{
      background: "#ffffff",
      padding: 48,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 40,
    }}
  >
    <Row label="SEARCH RESULT · 150PX — ALL 8" width={150} count={shots.length} />
    <Row label="PRODUCT PAGE · 300PX — FIRST 3 CARRY THE INSTALL" width={300} count={3} />
  </AbsoluteFill>
);
