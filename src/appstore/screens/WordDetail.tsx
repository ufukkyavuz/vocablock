import React from "react";
import { colors, fonts } from "../../tokens";
import { Card, Eyebrow, PrimaryButton, Screen } from "./ui";

/** Depth proof: this is a real dictionary entry, not a four-word phrasebook. */
export const WordDetail: React.FC = () => (
  <Screen padding="72px 24px 0">
    <Eyebrow>WORD</Eyebrow>

    <div
      style={{
        fontSize: 40,
        fontWeight: 700,
        color: colors.textDark,
        marginTop: 8,
        letterSpacing: -1,
      }}
    >
      Ephemeral
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: 13,
          color: colors.textMuted,
        }}
      >
        /ɪˈfem.ər.əl/
      </span>
      <span
        style={{
          background: colors.secondary,
          color: colors.secondaryForeground,
          borderRadius: 8,
          padding: "3px 8px",
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        adjective
      </span>
      <span
        style={{
          background: colors.primary,
          color: colors.foreground,
          borderRadius: 8,
          padding: "3px 8px",
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        C1
      </span>
    </div>

    <Card style={{ marginTop: 20 }}>
      <div
        style={{
          fontFamily: fonts.serifBody,
          fontSize: 17,
          fontWeight: 700,
          color: colors.textDark,
          lineHeight: 1.4,
        }}
      >
        Lasting for a very short time.
      </div>
      <div
        style={{
          fontFamily: fonts.serifBody,
          fontSize: 14,
          fontStyle: "italic",
          color: colors.textMuted,
          lineHeight: 1.5,
          marginTop: 12,
        }}
      >
        “The ephemeral beauty of cherry blossoms draws millions every spring.”
      </div>
    </Card>

    <div style={{ marginTop: 20 }}>
      <Eyebrow>SYNONYMS</Eyebrow>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
        {["fleeting", "transient", "momentary", "short-lived"].map((w) => (
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

    <div style={{ marginTop: 20 }}>
      <Eyebrow>OPPOSITE</Eyebrow>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
        {["permanent", "enduring"].map((w) => (
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

    <Card
      style={{
        marginTop: 20,
        background: colors.secondary,
        border: "none",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 12,
          background: colors.primary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 15,
          fontWeight: 700,
          color: colors.foreground,
        }}
      >
        3
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: colors.secondaryForeground }}>
        Heard in 3 reels you saved
      </div>
    </Card>

    <div style={{ marginTop: 18 }}>
      <PrimaryButton>Add to next session</PrimaryButton>
    </div>
  </Screen>
);
