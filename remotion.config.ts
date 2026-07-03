import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setConcurrency(2);
Config.setDelayRenderTimeoutInMilliseconds(60000);

// Use the Chromium headless shell pre-installed in this environment instead
// of downloading one, since outbound access to remotion.media is blocked.
if (process.env.REMOTION_BROWSER_EXECUTABLE) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE);
}
