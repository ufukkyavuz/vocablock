// Design tokens pulled straight from the VocabLock Figma file
// (Figma variables: base/primary, base/foreground, base/background, ...)
export const colors = {
  primary: "#a2f023",
  foreground: "#0e1625",
  textDark: "#111111",
  textMuted: "#888888",
  background: "#f9fbf8",
  card: "#ffffff",
  border: "#e0ebe5",
  secondary: "#eff3ed",
  secondaryForeground: "#152137",
  destructive: "#ef4343",
  destructiveTint: "rgba(220,38,38,0.1)",
} as const;

// Background gradients matching the app's visual language:
// light gradient for in-app / splash screens, dark for the locked-app state.
export const gradients = {
  light: "linear-gradient(160deg, #edf7dd 0%, #f9fbf8 50%, #f0f5ec 100%)",
  dark: "linear-gradient(160deg, #16233b 0%, #0e1625 55%, #0a1017 100%)",
} as const;

export const radius = {
  md: 14,
  card: 24,
  full: 9999,
} as const;

export const fonts = {
  ui: "Outfit",
  serifBody: "DM Sans",
  mono: "JetBrains Mono",
} as const;
