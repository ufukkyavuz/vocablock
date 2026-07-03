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
- `src/Root.tsx` — registers the `Promo` composition.
- `public/fonts/` — self-hosted Outfit / DM Sans / JetBrains Mono (the fonts used in the Figma file).

## Commands

```bash
npm install
npm run dev          # Remotion Studio — live preview & scrub the timeline
npm run render       # Render out/vocablock-promo.mp4
```

Scaffolding follows the official `create-video` "Blank" template conventions (React 19, `RemotionRoot`, flat ESLint config, Prettier).

## Editing the story

Scene order and durations live in `SCENE_DURATIONS` in `src/Promo.tsx`. Each scene is a normal React component using `useCurrentFrame()` — edit copy, timing, or add a new scene file and drop it into the `TransitionSeries`.
