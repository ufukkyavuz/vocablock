import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, fonts } from "../tokens";
import { Device } from "./Device";
import { Frame } from "./Frame";
import { layout, shots, socialProof } from "./config";
import { FlashcardRevealed } from "./screens/FlashcardRevealed";
import { FocusSetup } from "./screens/FocusSetup";
import { LockGate } from "./screens/LockGate";
import { Progress } from "./screens/Progress";
import { ReelsImport } from "./screens/ReelsImport";
import { ReviewPlan } from "./screens/ReviewPlan";
import { WordDetail } from "./screens/WordDetail";
import { CheckGlyph, LockGlyph } from "./screens/ui";

const copy = Object.fromEntries(shots.map((s) => [s.id, s]));

export const Shot01Lock: React.FC = () => (
  <Frame {...copy["01-lock"]}>
    <Device background={colors.foreground} statusBarTint="light">
      <LockGate />
    </Device>
  </Frame>
);

export const Shot02Learn: React.FC = () => (
  <Frame {...copy["02-learn"]}>
    <Device background={colors.background}>
      <FlashcardRevealed />
    </Device>
  </Frame>
);

/**
 * Gallery position 3 is where a ratings badge earns the most, but the badge
 * only renders once real App Store Connect numbers are filled into
 * `socialProof`. Until then this frame proves retention with the product.
 */
export const Shot03Retention: React.FC = () => (
  <Frame {...copy["03-retention"]}>
    {socialProof.enabled && socialProof.rating ? (
      <div
        style={{
          position: "absolute",
          top: layout.deviceTop - 128,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            background: colors.foreground,
            borderRadius: 999,
            padding: "18px 34px",
            fontFamily: fonts.ui,
          }}
        >
          <span style={{ fontSize: 40, fontWeight: 700, color: colors.primary }}>
            {socialProof.rating} ★
          </span>
          <span style={{ fontSize: 32, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>
            {socialProof.ratingCount}
          </span>
        </div>
      </div>
    ) : null}
    <Device background={colors.background}>
      <ReviewPlan />
    </Device>
  </Frame>
);

export const Shot04Reels: React.FC = () => (
  <Frame {...copy["04-reels"]}>
    <Device background={colors.foreground} statusBarTint="light">
      <ReelsImport />
    </Device>
  </Frame>
);

export const Shot05Depth: React.FC = () => (
  <Frame {...copy["05-depth"]}>
    <Device background={colors.background}>
      <WordDetail />
    </Device>
  </Frame>
);

export const Shot06Control: React.FC = () => (
  <Frame {...copy["06-control"]}>
    <Device background={colors.background}>
      <FocusSetup />
    </Device>
  </Frame>
);

export const Shot07Progress: React.FC = () => (
  <Frame {...copy["07-progress"]}>
    <Device background={colors.background}>
      <Progress />
    </Device>
  </Frame>
);

const CtaPoint: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 22,
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 28,
      padding: "26px 38px",
      width: 820,
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: 20,
        background: "rgba(162,240,35,0.14)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
    <div style={{ fontFamily: fonts.ui, fontSize: 40, fontWeight: 600, color: "#fff" }}>
      {label}
    </div>
  </div>
);

export const Shot08Cta: React.FC = () => (
  <Frame {...copy["08-cta"]}>
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        // Clears the caption block so the mark sits in the optical centre of
        // the remaining space rather than the centre of the canvas.
        paddingTop: 420,
      }}
    >
      <div
        style={{
          width: 188,
          height: 188,
          borderRadius: 52,
          background: colors.primary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LockGlyph size={102} color={colors.foreground} />
      </div>
      <div
        style={{
          marginTop: 34,
          fontFamily: fonts.ui,
          fontSize: 72,
          fontWeight: 700,
          color: "#fff",
          letterSpacing: -2,
        }}
      >
        VocabLock
      </div>
      <div
        style={{
          marginTop: 10,
          fontFamily: fonts.ui,
          fontSize: 38,
          fontWeight: 500,
          color: "rgba(255,255,255,0.5)",
        }}
      >
        The words come from your own feed.
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 22,
          alignItems: "center",
          marginTop: 90,
        }}
      >
        <CtaPoint
          icon={<LockGlyph size={34} color={colors.primary} />}
          label="Blocks with Screen Time"
        />
        <CtaPoint
          icon={<CheckGlyph size={32} color={colors.primary} />}
          label="Words from your own reels"
        />
        <CtaPoint
          icon={
            <span
              style={{
                fontFamily: fonts.ui,
                fontSize: 30,
                fontWeight: 700,
                color: colors.primary,
              }}
            >
              1m
            </span>
          }
          label="One minute to unlock"
        />
      </div>
    </AbsoluteFill>
  </Frame>
);

export const shotComponents = {
  Shot01Lock,
  Shot02Learn,
  Shot03Retention,
  Shot04Reels,
  Shot05Depth,
  Shot06Control,
  Shot07Progress,
  Shot08Cta,
} as const;
