import { staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";

export const fontsLoaded = Promise.all([
  loadFont({
    family: "Outfit",
    url: staticFile("fonts/outfit-variable.woff2"),
    weight: "100 900",
    style: "normal",
  }),
  loadFont({
    family: "DM Sans",
    url: staticFile("fonts/dmsans-variable.woff2"),
    weight: "100 900",
    style: "normal",
  }),
  loadFont({
    family: "DM Sans",
    url: staticFile("fonts/dmsans-italic.woff2"),
    weight: "400",
    style: "italic",
  }),
  loadFont({
    family: "JetBrains Mono",
    url: staticFile("fonts/jetbrainsmono-500.woff2"),
    weight: "500",
    style: "normal",
  }),
]);
