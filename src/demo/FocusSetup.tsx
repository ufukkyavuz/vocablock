import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage, DemoPhone, Caption, TapDot, Toggle, colors, fonts } from "./ui";

const TOGGLE_AT = 14;

const AppRow: React.FC<{
  icon: string;
  name: string;
  lockAt: number;
}> = ({ icon, name, lockAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lock = spring({ frame: frame - lockAt, fps, config: { damping: 11 } });
  const dim = interpolate(lock, [0, 1], [1, 0.45]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "16px 16px",
        borderRadius: 16,
        background: colors.card,
        border: `1px solid ${colors.border}`,
        position: "relative",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: colors.secondary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          opacity: dim,
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontSize: 17,
          fontWeight: 600,
          color: colors.textDark,
          opacity: dim,
          flex: 1,
        }}
      >
        {name}
      </span>
      {/* lock badge pops in */}
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: colors.foreground,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          opacity: lock,
          transform: `scale(${interpolate(lock, [0, 1], [0.2, 1])})`,
        }}
      >
        🔒
      </div>
    </div>
  );
};

export const FocusSetup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const warn = spring({ frame: frame - 46, fps, config: { damping: 16 } });

  return (
    <Stage tone="light">
      <DemoPhone>
        <div
          style={{
            padding: "70px 22px 0",
            fontFamily: fonts.ui,
            height: "100%",
            position: "relative",
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 700, color: colors.textDark }}>
            Focus Setup
          </div>

          {/* focus mode toggle row */}
          <div
            style={{
              marginTop: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "18px 18px",
              borderRadius: 18,
              background: colors.foreground,
            }}
          >
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>
                Focus Mode
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
                Block apps during your session
              </div>
            </div>
            <Toggle at={TOGGLE_AT} />
          </div>

          {/* apps lock one by one */}
          <div
            style={{
              fontSize: 11,
              letterSpacing: 1.4,
              fontWeight: 700,
              color: colors.textMuted,
              marginTop: 24,
              marginBottom: 12,
            }}
          >
            LOCKED WHILE YOU STUDY
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <AppRow icon="🎵" name="TikTok" lockAt={24} />
            <AppRow icon="📷" name="Instagram" lockAt={31} />
            <AppRow icon="💬" name="WhatsApp" lockAt={38} />
          </div>

          {/* warning banner */}
          <div
            style={{
              position: "absolute",
              left: 22,
              right: 22,
              bottom: 44,
              background: "rgba(220,38,38,0.09)",
              border: "1px solid rgba(220,38,38,0.28)",
              borderRadius: 16,
              padding: "14px 16px",
              opacity: warn,
              transform: `translateY(${interpolate(warn, [0, 1], [20, 0])}px)`,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, color: colors.destructive }}>
              Locked until you finish
            </div>
            <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>
              No shortcuts. Complete the pool to unlock.
            </div>
          </div>

          <TapDot x={330} y={150} at={TOGGLE_AT - 4} />
        </div>
      </DemoPhone>
      <Caption text="Scroll'u kilitle" delay={18} />
    </Stage>
  );
};
