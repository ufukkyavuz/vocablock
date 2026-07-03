import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const useEnter = (delay = 0, config?: Partial<Parameters<typeof spring>[0]>) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.6, ...config },
  });
};
