import { Composition, Still } from "remotion";
import "./fonts";
import { Promo, TOTAL_DURATION } from "./Promo";
import { ContactSheet, SHEET_HEIGHT, SHEET_WIDTH } from "./appstore/ContactSheet";
import { shotComponents } from "./appstore/Shots";
import { SHOT_HEIGHT, SHOT_WIDTH, shots } from "./appstore/config";

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

      {/* App Store gallery — one Still per frame, rendered by `npm run screenshots`. */}
      {shots.map((shot) => (
        <Still
          key={shot.compositionId}
          id={shot.compositionId}
          component={shotComponents[shot.compositionId as keyof typeof shotComponents]}
          width={SHOT_WIDTH}
          height={SHOT_HEIGHT}
        />
      ))}

      <Still
        id="ContactSheet"
        component={ContactSheet}
        width={SHEET_WIDTH}
        height={SHEET_HEIGHT}
      />
    </>
  );
};
