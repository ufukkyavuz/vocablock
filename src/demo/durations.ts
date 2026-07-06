// Frame lengths (at 30fps) for each beat in the Demo composition.
// Kept separate from Demo.tsx so scene files can import them without a
// circular dependency (scenes need their own duration for Ken Burns easing).
export const DEMO_DURATIONS = {
  splash: 50,
  home: 85,
  config: 85,
  focus: 85,
  locked: 55,
  flip: 120,
  complete: 90,
  paywall: 90,
} as const;
