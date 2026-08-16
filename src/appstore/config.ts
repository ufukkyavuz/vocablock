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
export const DEVICE_SCALE = 3;

export const layout = {
  gutter: 92,
  captionTop: 150,
  headlineSize: 108,
  headlineLeading: 1.0,
  // The device runs off the bottom edge, so the frame is mostly real UI
  // rather than marketing whitespace.
  deviceTop: 700,
  deviceBorder: 20,
  deviceRadius: 158,
} as const;

/**
 * Social proof badge (gallery positions 1 and 3).
 *
 * Ratings and install counts must come from App Store Connect — never from a
 * design file. Fill these in with the real numbers and flip `enabled` to true;
 * until then no badge renders anywhere in the set.
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
  /**
   * Segments wrapped in *asterisks* are set in the heavy weight. Emphasis is
   * carried by weight rather than colour, so the caption stays one ink colour
   * and reads as a sentence at thumbnail size.
   */
  headline: string;
  /** How far the device is turned. "flat" reads as a product shot, "tilt" as a moment. */
  pose: "flat" | "tilt";
  /** Show the ratings badge under the device (only ever renders if socialProof.enabled). */
  badge?: boolean;
};

// Sequence: problem -> fix -> proof -> differentiator -> depth -> control ->
// result -> close. The first three frames carry the install decision because
// they are the ones that show up in search results before a tap-through.
export const shots: ShotCopy[] = [
  {
    id: "01-lock",
    compositionId: "Shot01Lock",
    headline: "Your scroll now *costs one word*.",
    pose: "tilt",
    badge: true,
  },
  {
    id: "02-learn",
    compositionId: "Shot02Learn",
    headline: "Learn it, and *the app opens*.",
    pose: "flat",
  },
  {
    id: "03-retention",
    compositionId: "Shot03Retention",
    headline: "Built so the words *actually stay*.",
    pose: "tilt",
    badge: true,
  },
  {
    id: "04-reels",
    compositionId: "Shot04Reels",
    headline: "Turns your reels into *your word list*.",
    pose: "tilt",
  },
  {
    id: "05-depth",
    compositionId: "Shot05Depth",
    headline: "Real meanings, *real sentences*.",
    pose: "flat",
  },
  {
    id: "06-control",
    compositionId: "Shot06Control",
    headline: "You decide *what gets locked*.",
    pose: "flat",
  },
  {
    id: "07-progress",
    compositionId: "Shot07Progress",
    headline: "Watch your English *get sharper*.",
    pose: "tilt",
  },
  {
    id: "08-cta",
    compositionId: "Shot08Cta",
    headline: "*Lock the scroll.* Learn the word.",
    pose: "tilt",
  },
];
