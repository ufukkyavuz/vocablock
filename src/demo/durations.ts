// Frame lengths (at 30fps) for each beat in the Demo composition.
// Kept separate from Demo.tsx so scene files can import them without a
// circular dependency (scenes need their own duration for continuous
// Ken Burns zoom/pan easing).
export const DEMO_DURATIONS = {
  intro: 35,
  splash: 45,
  home: 75,
  config: 75,
  focus: 75,
  locked: 45,
  flip: 100,
  complete: 75,
  outro: 50,
} as const;
