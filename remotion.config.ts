import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setConcurrency(1);
Config.setDelayRenderTimeoutInMilliseconds(120000);

// Use the Chromium headless shell pre-installed in this environment instead
// of downloading one, since outbound access to remotion.media is blocked.
if (process.env.REMOTION_BROWSER_EXECUTABLE) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE);
}
