// Renders the whole App Store gallery in one pass.
//
// `remotion still` re-bundles for every frame; bundling once and looping over
// the compositions keeps a full set to a single bundle and browser boot.
import { bundle } from "@remotion/bundler";
import { getCompositions, renderStill } from "@remotion/renderer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mkdir } from "node:fs/promises";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.join(root, "out", "appstore");

// Remotion downloads its own Chromium by default. Point
// REMOTION_BROWSER_EXECUTABLE at an existing binary to reuse it instead.
const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE ?? null;

/** "Shot01Lock" -> "01-lock", so files sort in gallery upload order. */
const fileNameFor = (id) =>
  id === "ContactSheet"
    ? "contact-sheet"
    : id
        .replace(/^Shot/, "")
        .replace(/^(\d+)/, "$1-")
        .toLowerCase();

await mkdir(outDir, { recursive: true });

console.log("Bundling…");
const serveUrl = await bundle({
  entryPoint: path.join(root, "src", "index.ts"),
  onProgress: () => undefined,
});

const all = await getCompositions(serveUrl, { browserExecutable });
const targets = all
  .filter((c) => c.id.startsWith("Shot") || c.id === "ContactSheet")
  .sort((a, b) => a.id.localeCompare(b.id));

if (targets.length === 0) {
  throw new Error("No screenshot compositions found — check src/Root.tsx");
}

for (const composition of targets) {
  const file = fileNameFor(composition.id);
  await renderStill({
    composition,
    serveUrl,
    output: path.join(outDir, `${file}.png`),
    imageFormat: "png",
    browserExecutable,
    chromiumOptions: { gl: "swangle" },
  });
  console.log(`✓ ${file}.png  (${composition.width}×${composition.height})`);
}

console.log(`\nDone — ${targets.length} files in out/appstore/`);
