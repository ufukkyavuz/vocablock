import { Composition } from "remotion";
import "./fonts";
import { Promo, TOTAL_DURATION } from "./Promo";
import { Demo, DEMO_TOTAL } from "./Demo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Promo"
        component={Promo}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Demo"
        component={Demo}
        durationInFrames={DEMO_TOTAL}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
