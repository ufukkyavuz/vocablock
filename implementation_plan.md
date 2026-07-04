# Scene Draft — "TikTok Lock" 12s Vertical Ad

Script source: user-provided 12s / 9:16 ad script (2026-07-04).
Composition: new, separate from `Promo` (`TOTAL_DURATION` ~690f). This is a
tight 360-frame (12s @ 30fps, 1080x1920) cut with its own composition id,
e.g. `TikTokLockAd`.

Per the project's versioning rule (`3. Scene Revision & Versioning
Behavior.docx`): reused scenes are forked as new versions, originals stay
untouched. New scene numbering below is local to this ad, not the main Promo.

| # | Time | Frames (30fps) | Source | New file |
|---|------|-----------------|--------|----------|
| 1 | 0:00–0:02 | 0–60 | none (new) | `scenes/TapApp.tsx` |
| 2 | 0:02–0:04 | 60–120 | `LockScene.tsx` | `scenes/LockScene.v2.tsx` |
| 3 | 0:04–0:08 | 120–240 | `Flashcard.tsx` | `scenes/Flashcard.v2.tsx` |
| 4 | 0:08–0:10 | 240–300 | `Complete.tsx` + `Unlocked.tsx` | `scenes/CompleteUnlock.v2.tsx` |
| 5 | 0:10–0:12 | 300–360 | `Outro.tsx` | `scenes/Outro.v2.tsx` |

Colors: reuse `tokens.ts` as-is — `colors.foreground` (#0e1625) is already the
navy-black the script wants, `colors.primary` (#a2f023) is already the
electric lime. No new tokens needed.

## Scene 1 — Tap (new)

- Close-up phone home screen: dark wallpaper, a small icon grid.
- One icon is a generic short-video app glyph — **not** the TikTok logo:
  a rounded-square dark tile with an abstract lime music-note/play mark,
  built in code (no external asset needed).
- ~f0–40: static grid, subtle parallax drift.
- ~f40: tap ripple (lime radial pulse) on the icon.
- ~f40–46: freeze effect — brief desaturate + 2–3 frame jitter (`useCurrentFrame`
  offset, not real randomness, so it renders deterministically) + slight
  scale-down "bounce" to read as a soft haptic freeze.
- ~f46–60: text fades in bottom-third: **"Want to open TikTok?"**

## Scene 2 — Lock (`LockScene.v2`)

- Background flips from the current light `colors.background` to
  `colors.foreground` (dark) — see open question below.
- A shield-shaped card slides up from the bottom edge (spring translateY),
  big lime lock glyph centered at its top.
- Headline: **"Learn 10 words first."**
- Row of the existing `AppBadge` chips (TikTok / Instagram / WhatsApp),
  rendered in a visually "locked/dimmed" state.

## Scene 3 — Flashcards (`Flashcard.v2`)

- 120 frames / 3 words ⇒ 40 frames each:
  - f0–40: **hesitate → tereddüt etmek**
  - f40–80: **focus → odaklanmak**
  - f80–120: **improve → geliştirmek**
- Reuse the existing rotateY flip mechanic but compress the flip window to
  ~6–8 frames (was 12) so it reads as fast/snappy inside each 40-frame slot.
- "Don't Know" / "Got It!" buttons pinned bottom; "Got It!" gets the existing
  `pressScale` pulse timed to each card's reveal.
- Progress bar advances in 3 discrete jumps (33% → 66% → 100%) rather than
  the continuous count in v1, to sell "session finishing fast."
- Background: proposing dark `AbsoluteFill` behind a light flashcard "paper"
  for contrast (keeps card readable, unifies the ad's dark theme) — flagged
  below as a decision, since v1 runs light-on-light.

## Scene 4 — Complete + Unlock merge (`CompleteUnlock.v2`)

- Dark background throughout (matches `Unlocked.tsx` already).
- f0–20: lime ring animates 0→100% (compressed from v1's 45f ring fill).
- f20–28: ring swaps to the existing 🔓 badge with a spring scale-bounce —
  the "lock opens" moment.
- f28–60: headline **"Apps unlocked now."** slides/fades in; optionally the
  three app chips reappear "active" (undimmed), echoing Scene 2's locked
  chips for a visual bookend.

## Scene 5 — Packshot (`Outro.v2`)

- Same structure as `Outro.tsx` (dark bg, logo, tagline, CTA pill).
- Swap the placeholder "V" monogram for the real logo asset
  (`vocablock logo.svg` / `.png`, from the Drive Visuals folder — needs to
  be pulled into `public/` first).
- Headline text changes to **"Learn words. Unlock apps."**
- CTA stays **"Download VocabLock"** (already an exact match with v1).

## Decisions (confirmed)

1. **Flashcard colors stay as-is**: front face white / back face dark —
   this already matches the real app screenshots (`Session.png` /
   `Session — Revealed.png` in the Drive Visuals folder), so `Flashcard.v2`
   keeps v1's card coloring unchanged. Only the scene's outer background
   goes dark (`colors.foreground`) so the white/dark card reads with
   contrast against it. `LockScene.v2`'s own background also goes dark, per
   the original proposal.
2. **Transitions**: short 15-frame fades, same as `Promo.tsx`, not hard cuts.
   To keep the ad at exactly 12s (360 frames) with 4 transitions eating
   4×15=60 frames of overlap, each scene's own `durationInFrames` is padded
   proportionally (ratio 1:1:2:1:1 from the script's 2/2/4/2/2s beats):

   | Scene | durationInFrames | on-screen (after overlap) |
   |-------|-------------------|----------------------------|
   | 1 Tap | 70 | ~2s |
   | 2 Lock | 70 | ~2s |
   | 3 Flashcards | 140 | ~4s |
   | 4 Complete+Unlock | 70 | ~2s |
   | 5 Packshot | 70 | ~2s |
   | **Sum** | **420** | **360 (12s) after 4×15f overlap** |

3. **Logo asset**: `vocablock logo.svg` (from Drive Visuals) — needs to be
   pulled into `public/` before `Outro.v2` can reference it.

No code has been written yet — this is the scene draft only, per your ask.
