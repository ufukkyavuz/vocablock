// Frame lengths (at 30fps) for each beat in the Demo composition.
// Kept separate from Demo.tsx so scene files can import them without a
// circular dependency (scenes need their own duration for beat-local easing).
export const DEMO_DURATIONS = {
  intro: 35,
  splash: 40,
  home: 60,
  config: 60,
  focus: 60,
  locked: 38,
  flip: 90,
  complete: 60,
  midText: 32,
  paywall: 60,
  outro: 45,
} as const;
