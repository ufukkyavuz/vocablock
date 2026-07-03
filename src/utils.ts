import {
  spring,
  useCurrentFrame,
  useVideoConfig,
  type SpringConfig,
} from "remotion";

export const useEnter = (delay = 0, config?: Partial<SpringConfig>) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.6, ...config },
  });
};
