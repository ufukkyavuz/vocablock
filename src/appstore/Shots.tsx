import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, fonts } from "../tokens";
import { Device } from "./Device";
import { FloatingCard, FloatingNotification } from "./Floating";
import { Frame } from "./Frame";
import { shots } from "./config";
import { FlashcardRevealed } from "./screens/FlashcardRevealed";
import { FocusSetup } from "./screens/FocusSetup";
import { LockGate } from "./screens/LockGate";
import { Progress } from "./screens/Progress";
import { ReelsImport } from "./screens/ReelsImport";
import { ReviewPlan } from "./screens/ReviewPlan";
import { WordDetail } from "./screens/WordDetail";
import { CheckGlyph, LockGlyph } from "./screens/ui";

const copy = Object.fromEntries(shots.map((s) => [s.id, s]));

export const Shot01Lock: React.FC = () => {
  const c = copy["01-lock"];
  return (
    <Frame headline={c.headline} seed={1} badge={c.badge}>
      <Device
        background={colors.foreground}
        statusBarTint="light"
        pose={c.pose}
        offsetY={250}
      >
        <LockGate />
      </Device>
      {/* The nudges that arrive before the shield does — the screen underneath
          already says it is locked, so these carry what it cannot. */}
      <FloatingNotification
        y={700}
        x={70}
        width={880}
        tilt={-1.6}
        title="32 minutes on Instagram"
        body="Time to earn the next one."
      />
      <FloatingNotification
        y={912}
        x={286}
        width={820}
        tilt={-2.4}
        title="Ephemeral is ready"
        body="One word buys you 15 minutes."
      />
    </Frame>
  );
};

export const Shot02Learn: React.FC = () => {
  const c = copy["02-learn"];
  return (
    <Frame headline={c.headline} seed={2}>
      <Device background={colors.background} pose={c.pose} offsetY={70}>
        <FlashcardRevealed />
      </Device>
    </Frame>
  );
};

export const Shot03Retention: React.FC = () => {
  const c = copy["03-retention"];
  return (
    <Frame headline={c.headline} seed={3} badge={c.badge}>
      <Device background={colors.background} pose={c.pose} offsetY={70}>
        <ReviewPlan />
      </Device>
    </Frame>
  );
};

export const Shot04Reels: React.FC = () => {
  const c = copy["04-reels"];
  return (
    <Frame headline={c.headline} seed={4}>
      <Device
        background={colors.foreground}
        statusBarTint="light"
        pose={c.pose}
        offsetY={220}
      >
        <ReelsImport />
      </Device>
      <FloatingCard y={760} x={190} width={940} tone="dark" tilt={-2}>
        <div style={{ display: "grid", gap: 16 }}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 26,
              letterSpacing: 3,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            YOU WATCHED 4 REELS
          </div>
          <div style={{ fontSize: 46, fontWeight: 800, letterSpacing: -1.2 }}>
            We kept 17 words from them.
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {["overrated", "burnout", "on a whim"].map((w) => (
              <span
                key={w}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.16)",
                  borderRadius: 999,
                  padding: "14px 26px",
                  fontSize: 34,
                  fontWeight: 600,
                }}
              >
                <span style={{ color: colors.primary }}>+ </span>
                {w}
              </span>
            ))}
          </div>
        </div>
      </FloatingCard>
    </Frame>
  );
};

export const Shot05Depth: React.FC = () => {
  const c = copy["05-depth"];
  return (
    <Frame headline={c.headline} seed={5}>
      <Device background={colors.background} pose={c.pose} offsetY={70}>
        <WordDetail />
      </Device>
    </Frame>
  );
};

export const Shot06Control: React.FC = () => {
  const c = copy["06-control"];
  return (
    <Frame headline={c.headline} seed={6}>
      <Device background={colors.background} pose={c.pose} offsetY={210}>
        <FocusSetup />
      </Device>
      <FloatingCard y={790} width={800} tilt={-1.6} align="center">
        <div style={{ display: "grid", gap: 10, justifyItems: "center" }}>
          <div style={{ fontSize: 46, fontWeight: 800, letterSpacing: -1 }}>
            5 words = 15 minutes
          </div>
          <div style={{ fontSize: 30, fontWeight: 500, color: colors.textMuted }}>
            WhatsApp and Maps stay open
          </div>
        </div>
      </FloatingCard>
    </Frame>
  );
};

export const Shot07Progress: React.FC = () => {
  const c = copy["07-progress"];
  return (
    <Frame headline={c.headline} seed={7}>
      <Device background={colors.background} pose={c.pose} offsetY={70}>
        <Progress />
      </Device>
    </Frame>
  );
};

const CtaPoint: React.FC<{ icon: React.ReactNode; label: string; tilt: number }> = ({
  icon,
  label,
  tilt,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 26,
      background: "rgba(255,255,255,0.94)",
      border: "1px solid rgba(255,255,255,1)",
      borderRadius: 999,
      padding: "22px 44px 22px 22px",
      boxShadow:
        "0 34px 58px -20px rgba(24,40,20,0.4), inset 0 1px 0 rgba(255,255,255,0.9)",
      transform: `rotateZ(${tilt}deg)`,
      fontFamily: fonts.ui,
    }}
  >
    <div
      style={{
        width: 76,
        height: 76,
        borderRadius: 26,
        background: colors.foreground,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
    <div style={{ fontSize: 40, fontWeight: 700, color: colors.textDark, letterSpacing: -0.8 }}>
      {label}
    </div>
  </div>
);

export const Shot08Cta: React.FC = () => {
  const c = copy["08-cta"];
  return (
    <Frame headline={c.headline} seed={8}>
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          // Clears the caption block so the mark sits in the optical centre of
          // the space that is left.
          paddingTop: 540,
        }}
      >
        <div
          style={{
            width: 396,
            height: 396,
            borderRadius: 112,
            background: colors.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "0 80px 110px -30px rgba(24,40,20,0.55), 0 0 0 30px rgba(162,240,35,0.16), inset 0 4px 0 rgba(255,255,255,0.75)",
            transform: "perspective(1800px) rotateY(-8deg) rotateZ(-2deg)",
          }}
        >
          <LockGlyph size={214} color={colors.foreground} />
        </div>
        <div
          style={{
            marginTop: 72,
            fontFamily: fonts.ui,
            fontSize: 108,
            fontWeight: 800,
            color: "#0d1420",
            letterSpacing: -3,
          }}
        >
          VocabLock
        </div>
        <div
          style={{
            marginTop: 14,
            fontFamily: fonts.ui,
            fontSize: 44,
            fontWeight: 500,
            color: colors.textMuted,
          }}
        >
          The words come from your own feed.
        </div>

        <div
          style={{
            marginTop: 104,
            display: "flex",
            flexDirection: "column",
            gap: 32,
            alignItems: "center",
          }}
        >
          <CtaPoint
            tilt={-1.4}
            icon={<LockGlyph size={38} color={colors.primary} />}
            label="Blocked with Screen Time"
          />
          <CtaPoint
            tilt={0.9}
            icon={<CheckGlyph size={36} color={colors.primary} />}
            label="Words from your own reels"
          />
          <CtaPoint
            tilt={-0.8}
            icon={
              <span
                style={{
                  fontFamily: fonts.ui,
                  fontSize: 30,
                  fontWeight: 800,
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
};

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
