# VocabLock — App Store gallery: competitors, positioning, and the screenshot set

Research date: August 2026. Sources are linked at the bottom.

## 1. The competitive set

"Lock your apps until you learn a word" is no longer an empty niche. A cluster
of apps shipped into it during 2025–2026, all built on the same Apple Screen
Time API, all in Education, all with few or no ratings yet:

| App | Subtitle | Angle | Languages | Price |
| --- | --- | --- | --- | --- |
| **Glosso** | "App blocker. Earn your scroll." | Duolingo-style mascot that grows as you feed it words; 47+ cosmetic unlockables | 9 | $4.99/mo · $24.99/yr · $89.99 lifetime |
| **Vocab Lock** | "Learn Words. Earn Your Scroll." | Daily word target (5/10/15/20), streaks + streak freezes | 12 | $9.99/wk · $49.99/yr |
| **LanguageLock** | "Block apps, learn a language" | 30-second micro-lessons, gentle friction | several | $4.99/wk · $34.99/yr |
| **LingoLock** | "The iOS App Blocker That Teaches You a Language" | Variable-reward loop borrowed from social apps; 5 min of access per lesson | 8 (A1–B2) | freemium |
| **VocaLock** | "App Lock & Learn" | Locks at three fixed moments a day | — | freemium |
| **Lockcard** | "Vocabulary Builder" | Lock-screen widget rather than a blocker | — | freemium |

Adjacent, much larger neighbours matter for the visual field: pure blockers
(Opal, one sec, Brick, ScreenZen, Freedom) and pure vocabulary apps (Duolingo,
Drops, Lingvist, and in Turkey exam-focused apps like Kelibu for YDS/YÖKDİL/YDT).

### What the category has converged on

Three things are now table stakes, and saying them louder is not a strategy:

1. **The same sentence.** "Turn screen time into learning." Two of the six use
   the literal phrase *"Earn your scroll"* in their subtitle. Any VocabLock copy
   in that shape reads as the fourth clone in the search results.
2. **Breadth as the pitch.** 8–12 languages at A1–B2. Everyone is racing to add
   Korean and Japanese.
3. **Gamification as the retention story.** Mascots, streak freezes, cosmetics.

### Where VocabLock can actually stand apart

Only one thing in the product is genuinely absent from every competitor:

- **The words come from the user's own feed.** Tag a reel, VocabLock pulls the
  vocabulary out of it. Nobody else has this. It also reframes the whole
  category: the others gate your scroll with *unrelated* tourist vocabulary, so
  the lesson is a toll. VocabLock's lesson is made of what you were about to
  watch — a loop, not a toll.
- **Depth over breadth.** Real definitions, example sentences, synonyms, CEFR
  level. That is the exam-prep learner (Turkey: YDS/YÖKDİL/YDT), a segment the
  A1–B2 phrasebook players do not serve. Competing on "12 languages" against
  Vocab Lock is a losing race; competing on "the English that actually shows up
  on the exam and in the reel" is not.
- **Selective locking.** VocabLock keeps chosen apps open. Blocker reviews show
  all-or-nothing enforcement is the most common reason people uninstall.

The gallery below is built on those three, in that order.

## 2. What 2026 screenshot practice actually says

Distilled from the ASO guides listed at the bottom, and applied here:

| Practice | How this set applies it |
| --- | --- |
| 1320×2868 (6.9" iPhone) covers the whole modern iPhone gallery | `SHOT_WIDTH`/`SHOT_HEIGHT` in `src/appstore/config.ts` |
| Vertical is the format — ~96% of top apps | All 8 frames |
| The first three frames carry the install decision (they appear in search results) | Problem → fix → retention proof, in that order |
| 3–5 words per caption, bold, legible at thumbnail size | Every headline is two short lines; `ContactSheet` renders the set at 150px to check |
| One dominant element per frame | One accent phrase per headline, one focal screen per device |
| ~60% of the frame should be real app UI, not marketing art | Device starts at y=780 and bleeds off the bottom edge |
| Pull the palette from the icon, don't chase trend colors | `src/tokens.ts` — the Figma variables, unchanged |
| Caption contrast at WCAG AA (4.5:1) | Sub-captions use `#5b6470` on light, not the app's `#888` |
| Social proof around position 3 | Slot built into frame 3, **disabled** until real numbers exist (see §4) |
| Up to 10 slots, but only use frames that add information | 8 frames; nothing repeats a point |
| Localize by adapting, not translating flattened images | TR captions in §5 |

## 3. The set

| # | File | Headline | Job |
| --- | --- | --- | --- |
| 1 | `01-lock.png` | Pay **one word** to scroll. | States the mechanic and the price in one line. The shield screen is the product's single most recognizable moment. |
| 2 | `02-learn.png` | Learn it. Then **unlock**. | Shows the loop is 30 seconds, not a lesson. Kills the "this will be a chore" objection. |
| 3 | `03-retention.png` | Words that **actually stick**. | The spaced-repetition schedule, shown rather than claimed. This is the retention proof, and the slot where a ratings badge goes once one exists. |
| 4 | `04-reels.png` | **Reels** in. Vocabulary out. | The differentiator. Nothing else in the category can show this frame. |
| 5 | `05-depth.png` | **Real** definitions. Real sentences. | Depth: CEFR level, synonyms, example sentence. Separates VocabLock from phrasebook apps. |
| 6 | `06-control.png` | You choose what **locks**. | Answers the objection that sinks blockers — "I can't lock everything, I need WhatsApp." |
| 7 | `07-progress.png` | Every session, **sharper**. | The outcome, including screen time traded. |
| 8 | `08-cta.png` | **Lock** the scroll. **Learn** the word. | Close: mark, tagline, three reasons. |

Frames 1, 4, 7 and 8 are on the dark surface, the rest light. The alternation
gives the row of thumbnails a rhythm and keeps neighbouring frames from merging
into one block at gallery size.

### Store metadata to match

The gallery only works if the subtitle does not repeat the category's stock
phrase. Suggested, in descending confidence:

- Subtitle: **"Learn the words from your own reels"** (30 chars) — leads with
  the thing no competitor can claim.
- Alternative: "Block apps. Learn real English."
- Avoid: anything containing "earn your scroll" or "turn screen time into…".

## 4. The social-proof frame is deliberately off

Position 3 is where a ratings badge earns the most, and `socialProof` in
`src/appstore/config.ts` reserves it. It renders nothing until real numbers from
App Store Connect are filled in:

```ts
export const socialProof = {
  enabled: false,
  rating: null,       // e.g. "4.8"
  ratingCount: null,  // e.g. "1,240 ratings"
};
```

Fabricated ratings in screenshot artwork are a straightforward App Review
rejection under the Developer Program agreement, quite apart from being false.
Flip `enabled` once the numbers are real; the frame keeps working either way.

## 5. Turkish storefront

Turkish runs roughly 15–25% longer than English, and two of the headlines break
badly if translated literally. These are rewritten to fit the same two-line
block, not translated:

| # | TR headline | TR sub |
| --- | --- | --- |
| 1 | Kaydırmanın bedeli: **bir kelime**. | Öğrenene kadar Instagram kapalı. |
| 2 | Öğren. Sonra **aç**. | Kelime, anlam, örnek — bir dakikadan kısa. |
| 3 | **Aklında kalan** kelimeler. | Aralıklı tekrar her kelimeyi zamanında geri getirir. |
| 4 | **Reels** girer. Kelime çıkar. | Bir reel'de bizi etiketle — kelimeleri biz çıkaralım. |
| 5 | **Gerçek** anlam. Gerçek cümle. | Sınav ve gerçek İngilizce için — turistik kalıplar değil. |
| 6 | **Neyin** kilitleneceğini sen seç. | İhtiyacın olan uygulamalar açık kalsın. |
| 7 | Her seansta **daha keskin**. | Hangi kelimenin kaldığını tam olarak gör. |
| 8 | Kaydırmayı **kilitle**. Kelimeyi **öğren**. | — |

For the TR storefront, consider promoting frame 5 (exam depth) to position 3:
YDS/YÖKDİL intent is a much stronger install driver there than the retention
mechanic, and the incumbent Turkish vocabulary apps are all exam-framed.

## 6. Rendering

```bash
npm run screenshots   # -> out/appstore/*.png
```

Bundles once, then renders all 8 frames plus `contact-sheet.png`. The contact
sheet is the legibility check, not a deliverable: the top row is the set at the
~150px width a search result gets, the bottom row the first three at
product-page size. If a caption fails there, it fails in the store.

To reuse an existing Chromium instead of letting Remotion download one:

```bash
REMOTION_BROWSER_EXECUTABLE=/path/to/chrome-headless-shell npm run screenshots
```

## Sources

- [App Store Screenshot Best Practices for ASO in 2026 — AppLaunchFlow](https://www.applaunchflow.com/blog/app-store-screenshot-best-practices-2026)
- [App Store Screenshot Best Practices: 2026 Conversion Guide — AppScreenshotStudio](https://appscreenshotstudio.com/app-store-screenshot-best-practices)
- [App Store Screenshot Guidelines 2026 — TheAppLaunchpad](https://theapplaunchpad.com/blog/app-store-screenshot-guidelines/)
- [How to optimize your app store screenshots — AppTweak](https://www.apptweak.com/en/aso-blog/how-to-optimize-your-app-screenshots)
- [Glosso: Screen Time + Language — App Store](https://apps.apple.com/us/app/glosso-screen-time-language/id6758268715)
- [Vocab Lock: Learn to Unlock — App Store](https://apps.apple.com/kh/app/vocab-lock-learn-to-unlock/id6760270668)
- [LanguageLock: Screen Time — App Store](https://apps.apple.com/ai/app/languagelock-screen-time/id6773133852)
- [LingoLock](https://lingolock.xyz/)
- [Best App Blockers for iPhone (2026) — Habit Doom](https://habitdoom.com/blog/best-app-blockers-iphone-2026)
- [Best Apps to Learn a Language in 2026 — ASO Mobile](https://asomobile.net/en/blog/best-apps-to-learn-a-language-in-2026-10-options-for-every-goal/)
- [Kelibu: İngilizce Kelime Öğren — App Store](https://apps.apple.com/us/app/id6484268631)
