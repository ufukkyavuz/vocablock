import React from "react";
import { colors, fonts } from "../../tokens";
import { AppTile, LockGlyph, PrimaryButton, Screen } from "./ui";

/**
 * The shield screen VocabLock puts in front of a blocked app.
 * App tiles are abstract — no third-party logos appear in the artwork.
 */
export const LockGate: React.FC = () => (
  <Screen background={colors.foreground} padding="0">
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "100px 30px 0",
        boxSizing: "border-box",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 30,
          background: colors.primary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 0 14px rgba(162,240,35,0.12)",
        }}
      >
        <LockGlyph size={46} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 34 }}>
        <AppTile from="#f0399b" to="#f7b733" size={30} />
        <div style={{ fontSize: 26, fontWeight: 700, color: "#fff", letterSpacing: -0.5 }}>
          Instagram
        </div>
      </div>

      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: "rgba(255,255,255,0.42)",
          letterSpacing: -0.5,
          marginTop: 2,
        }}
      >
        is locked
      </div>

      <div
        style={{
          marginTop: 26,
          fontFamily: fonts.serifBody,
          fontSize: 15,
          lineHeight: 1.5,
          color: "rgba(255,255,255,0.62)",
          maxWidth: 270,
        }}
      >
        Learn <b style={{ color: colors.primary }}>1 word</b> to unlock 15 minutes.
      </div>

      <div
        style={{
          marginTop: 30,
          width: "100%",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 20,
          padding: "16px 18px",
          textAlign: "left",
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 10,
            letterSpacing: 1.6,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          NEXT WORD
        </div>
        <div style={{ fontSize: 24, fontWeight: 600, color: "#fff", marginTop: 6 }}>
          Ephemeral
        </div>
        <div
          style={{
            fontFamily: fonts.serifBody,
            fontSize: 12,
            color: "rgba(255,255,255,0.45)",
            marginTop: 4,
          }}
        >
          From a reel you saved on Tuesday
        </div>
      </div>

      <div style={{ width: "100%", marginTop: 22 }}>
        <PrimaryButton>Start 1-word session</PrimaryButton>
      </div>

      <div
        style={{
          marginTop: 16,
          fontSize: 13,
          fontWeight: 500,
          color: "rgba(255,255,255,0.35)",
        }}
      >
        Locked by VocabLock · Screen Time
      </div>

      <div
        style={{
          marginTop: 30,
          width: "100%",
          display: "flex",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: 22,
        }}
      >
        {[
          ["3", "Unlocks today"],
          ["14", "Words today"],
          ["21", "Day streak"],
        ].map(([v, l]) => (
          <div key={l} style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>{v}</div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: "rgba(255,255,255,0.4)",
                marginTop: 2,
              }}
            >
              {l}
            </div>
          </div>
        ))}
      </div>
    </div>
  </Screen>
);
