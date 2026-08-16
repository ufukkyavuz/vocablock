import React from "react";
import { colors, fonts } from "../../tokens";
import { Eyebrow, PrimaryButton, Screen } from "./ui";

/**
 * The differentiator: vocabulary pulled out of the reels the user already
 * watches. Reel thumbnails are abstract gradients — no third-party content.
 */
const ReelCard: React.FC<{ from: string; to: string; word: string; count: string }> = ({
  from,
  to,
  word,
  count,
}) => (
  <div
    style={{
      flex: 1,
      borderRadius: 18,
      overflow: "hidden",
      background: `linear-gradient(160deg, ${from}, ${to})`,
      height: 140,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: 12,
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55))",
      }}
    />
    <div style={{ position: "relative" }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{word}</div>
      <div style={{ fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.75)" }}>
        {count}
      </div>
    </div>
  </div>
);

export const ReelsImport: React.FC = () => (
  <Screen background={colors.foreground} padding="72px 24px 0">
    <Eyebrow color="rgba(255,255,255,0.45)">FROM INSTAGRAM</Eyebrow>
    <div
      style={{
        fontSize: 24,
        fontWeight: 700,
        color: "#fff",
        marginTop: 6,
        letterSpacing: -0.4,
      }}
    >
      Tag us on a reel
    </div>
    <div
      style={{
        fontFamily: fonts.serifBody,
        fontSize: 13,
        color: "rgba(255,255,255,0.55)",
        marginTop: 4,
      }}
    >
      We pull the vocabulary out and queue it.
    </div>

    <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
      <ReelCard from="#7b5cff" to="#2a1a6b" word="4 new words" count="reel · 0:34" />
      <ReelCard from="#f0399b" to="#6d1442" word="7 new words" count="reel · 1:02" />
    </div>

    <div
      style={{
        marginTop: 18,
        display: "flex",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 20,
        padding: "16px 8px",
      }}
    >
      {[
        ["20", "Imported"],
        ["3", "Learned"],
        ["17", "To learn"],
        ["4", "Reels"],
      ].map(([v, l]) => (
        <div key={l} style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: colors.primary }}>{v}</div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 500,
              color: "rgba(255,255,255,0.5)",
              marginTop: 2,
            }}
          >
            {l}
          </div>
        </div>
      ))}
    </div>

    <div
      style={{
        marginTop: 20,
        fontFamily: fonts.mono,
        fontSize: 10,
        letterSpacing: 1.6,
        color: "rgba(255,255,255,0.4)",
      }}
    >
      QUEUED FROM YOUR REELS
    </div>

    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
      {["overrated", "burnout", "spiralling", "underrated", "cluttered", "on a whim"].map(
        (w) => (
          <div
            key={w}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 999,
              padding: "8px 14px",
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span style={{ color: colors.primary }}>+</span>
            {w}
          </div>
        ),
      )}
    </div>

    <div style={{ marginTop: 24 }}>
      <PrimaryButton>Learn all 17</PrimaryButton>
    </div>
  </Screen>
);
