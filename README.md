# VocabLock — Promo Video (Figma → Claude → Remotion)

A Remotion project that turns the [VocabLock Figma screens](https://www.figma.com/design/mVgOsVXqRFDI3FoAsIt4Lx/) into a short vertical (1080×1920) promo/demo video, built with real design tokens and copy pulled from the Figma file via the Figma MCP server.

## How the pipeline works

1. **Figma** is the source of truth for screens, colors, type, and copy (`get_design_context` / `get_variable_defs` via the Figma MCP tools).
2. **Claude** reads the design context and re-implements the screens as lightweight React components (not 1:1 Figma-to-code, but faithful to the tokens: `src/tokens.ts`) and choreographs them into a narrative with Remotion's animation primitives (`spring`, `interpolate`) and scene transitions (`@remotion/transitions`).
3. **Remotion** renders the React composition to an MP4 — no screen recording, no manual video editing. Change a scene's React code and re-render.

## Structure

- `src/tokens.ts` — colors/fonts pulled from Figma variables.
- `src/components/PhoneFrame.tsx` — reusable device mockup.
- `src/scenes/*.tsx` — one component per beat: Hook → Lock → Flashcard → Complete → Unlocked → Paywall → Outro.
- `src/Promo.tsx` — sequences the scenes with fade transitions.
- `src/Root.tsx` — registers the `Promo` composition and the App Store stills.
- `src/appstore/` — the App Store screenshot set (see below).
- `public/fonts/` — self-hosted Outfit / DM Sans / JetBrains Mono (the fonts used in the Figma file).

## Commands

```bash
npm install
npm run dev          # Remotion Studio — live preview & scrub the timeline
npm run render       # Render out/vocablock-promo.mp4
npm run screenshots  # Render out/appstore/*.png (the App Store gallery)
```

Scaffolding follows the official `create-video` "Blank" template conventions (React 19, `RemotionRoot`, flat ESLint config, Prettier).

> `package.json` lists `./src/fonts.ts` under `sideEffects`. Without it webpack
> tree-shakes the side-effect-only font module out of the bundle and everything
> renders in a serif fallback.

## App Store screenshots

The same tokens that drive the video also drive an 8-frame App Store gallery at
1320×2868 (6.9" iPhone, which covers every modern iPhone size).

- `src/appstore/config.ts` — canvas size, layout constants, and the caption copy
  for all 8 frames in gallery order.
- `src/appstore/Frame.tsx` — shared caption/surface system. A headline segment
  wrapped in `[brackets]` takes the brand accent.
- `src/appstore/Device.tsx` — device mockup; screens are authored in iPhone
  points and scaled up, so they match the video's screens.
- `src/appstore/screens/*.tsx` — the static app screens shown in each frame.
- `src/appstore/ContactSheet.tsx` — renders the whole set at search-result
  thumbnail size, to check captions are still legible there.

`npm run screenshots` bundles once and renders all of them, including the
contact sheet, into `out/appstore/`. Set `REMOTION_BROWSER_EXECUTABLE` to reuse
an existing Chromium rather than downloading one.

The competitor analysis, the 2026 ASO practice each layout decision comes from,
and the Turkish caption set are in [`docs/appstore-aso.md`](docs/appstore-aso.md).

## Editing the story

Scene order and durations live in `SCENE_DURATIONS` in `src/Promo.tsx`. Each scene is a normal React component using `useCurrentFrame()` — edit copy, timing, or add a new scene file and drop it into the `TransitionSeries`.
