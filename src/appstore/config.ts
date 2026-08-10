// App Store screenshot design system.
//
// Sizes follow Apple's 2026 base upload sizes: a 6.9" iPhone set at
// 1320x2868 is accepted for every modern iPhone display size, so one
// vertical set covers the whole gallery.
export const SHOT_WIDTH = 1320;
export const SHOT_HEIGHT = 2868;

// The app screens below are authored in iPhone points (390x844, the same
// canvas the promo scenes use) and scaled up into the shot. Writing them at
// point size keeps the UI proportions honest instead of guessing at
// screenshot-scale paddings.
export const SCREEN_W = 390;
export const SCREEN_H = 844;
export const DEVICE_SCALE = 2.9;

export const layout = {
  gutter: 96,
  captionTop: 168,
  headlineSize: 104,
  headlineLeading: 1.08,
  subSize: 44,
  // The device starts here and runs off the bottom edge, so the frame is
  // mostly real UI rather than marketing whitespace.
  deviceTop: 780,
  deviceBorder: 22,
  deviceRadius: 150,
} as const;

/**
 * Social proof frame (gallery position 3).
 *
 * Ratings and install counts must come from App Store Connect — never from a
 * design file. Fill these in with the real numbers and flip `enabled` to true;
 * until then the frame renders product proof only, with no ratings badge.
 */
export const socialProof: {
  enabled: boolean;
  rating: string | null;
  ratingCount: string | null;
} = {
  enabled: false,
  rating: null,
  ratingCount: null,
};

export type ShotId =
  | "01-lock"
  | "02-learn"
  | "03-retention"
  | "04-reels"
  | "05-depth"
  | "06-control"
  | "07-progress"
  | "08-cta";

export type ShotCopy = {
  id: ShotId;
  /** Composition id registered in Root.tsx and used by the render script. */
  compositionId: string;
  /** 3-5 words. Verified legible at gallery thumbnail size. */
  headline: string;
  /** One supporting line. Optional by design — frames may carry headline only. */
  sub?: string;
  surface: "dark" | "light";
};

// Sequence: problem -> fix -> proof -> differentiator -> depth -> control ->
// result -> close. The first three frames carry the install decision because
// they are the ones that show up in search results before a tap-through.
export const shots: ShotCopy[] = [
  {
    id: "01-lock",
    compositionId: "Shot01Lock",
    headline: "Pay [one word]\nto scroll.",
    sub: "Instagram stays shut until you learn it.",
    surface: "dark",
  },
  {
    id: "02-learn",
    compositionId: "Shot02Learn",
    headline: "Learn it.\nThen [unlock].",
    sub: "Word, meaning, example — under a minute.",
    surface: "light",
  },
  {
    id: "03-retention",
    compositionId: "Shot03Retention",
    headline: "Words that\n[actually stick].",
    sub: "Spaced repetition brings each word back on time.",
    surface: "light",
  },
  {
    id: "04-reels",
    compositionId: "Shot04Reels",
    headline: "[Reels] in.\nVocabulary out.",
    sub: "Tag us on a reel — we pull the words you just heard.",
    surface: "dark",
  },
  {
    id: "05-depth",
    compositionId: "Shot05Depth",
    headline: "[Real] definitions.\nReal sentences.",
    sub: "Built for exams and real English, not tourist phrases.",
    surface: "light",
  },
  {
    id: "06-control",
    compositionId: "Shot06Control",
    headline: "You choose\nwhat [locks].",
    sub: "Keep the apps you actually need open.",
    surface: "light",
  },
  {
    id: "07-progress",
    compositionId: "Shot07Progress",
    headline: "Every session,\n[sharper].",
    sub: "See exactly which words are sticking.",
    surface: "dark",
  },
  {
    id: "08-cta",
    compositionId: "Shot08Cta",
    headline: "[Lock] the scroll.\n[Learn] the word.",
    surface: "dark",
  },
];
