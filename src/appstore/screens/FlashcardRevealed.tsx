import React from "react";
import { colors, fonts } from "../../tokens";
import { CheckGlyph, Screen } from "./ui";

/** Card mid-session with the answer revealed — the core loop in one look. */
export const FlashcardRevealed: React.FC = () => (
  <Screen padding="72px 24px 0">
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          letterSpacing: 1.6,
          color: colors.textMuted,
        }}
      >
        SESSION
      </span>
      <span style={{ fontSize: 13, fontWeight: 600, color: colors.textMuted }}>
        <b style={{ color: colors.textDark }}>12</b> / 20 known
      </span>
    </div>

    <div
      style={{
        marginTop: 12,
        height: 8,
        borderRadius: 999,
        background: "rgba(14,22,37,0.08)",
        overflow: "hidden",
      }}
    >
      <div style={{ height: "100%", width: "60%", background: colors.primary }} />
    </div>

    <div
      style={{
        marginTop: 26,
        background: colors.foreground,
        borderRadius: 26,
        padding: "30px 26px 34px",
        boxShadow: "0 24px 48px rgba(14,22,37,0.18)",
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 10,
          letterSpacing: 1.8,
          color: "rgba(255,255,255,0.4)",
        }}
      >
        DEFINITION
      </div>
      <div
        style={{
          fontSize: 34,
          fontWeight: 700,
          color: colors.primary,
          marginTop: 12,
          letterSpacing: -0.6,
        }}
      >
        Ephemeral
      </div>
      <div
        style={{
          fontFamily: fonts.serifBody,
          fontSize: 19,
          fontWeight: 700,
          color: "#fff",
          lineHeight: 1.35,
          marginTop: 10,
        }}
      >
        Lasting for a very short time.
      </div>
      <div
        style={{
          height: 1,
          background: "rgba(255,255,255,0.12)",
          margin: "18px 0",
        }}
      />
      <div
        style={{
          fontFamily: fonts.serifBody,
          fontSize: 14,
          fontStyle: "italic",
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.45,
        }}
      >
        “The ephemeral beauty of cherry blossoms draws millions every spring.”
      </div>
    </div>

    <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
      <div
        style={{
          flex: 1,
          height: 58,
          borderRadius: 16,
          background: colors.destructiveTint,
          color: colors.destructive,
          fontWeight: 700,
          fontSize: 15,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        Don&apos;t know
      </div>
      <div
        style={{
          flex: 1,
          height: 58,
          borderRadius: 16,
          background: colors.primary,
          color: colors.foreground,
          fontWeight: 700,
          fontSize: 15,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <CheckGlyph size={17} color={colors.foreground} />
        Got it
      </div>
    </div>

    <div
      style={{
        marginTop: 20,
        textAlign: "center",
        fontSize: 13,
        fontWeight: 500,
        color: colors.textMuted,
      }}
    >
      8 words left to unlock Instagram
    </div>

    <div style={{ marginTop: 28 }}>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 10,
          letterSpacing: 1.6,
          color: colors.textMuted,
        }}
      >
        UP NEXT
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
        {["Ubiquitous", "Candid", "Meticulous"].map((w) => (
          <div
            key={w}
            style={{
              background: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: 999,
              padding: "8px 14px",
              fontSize: 13,
              fontWeight: 600,
              color: colors.textDark,
            }}
          >
            {w}
          </div>
        ))}
      </div>
    </div>
  </Screen>
);
