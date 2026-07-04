import { Composition } from "remotion";
import "./fonts";
import { Promo, TOTAL_DURATION } from "./Promo";
import { TikTokLockAd, AD_TOTAL_DURATION } from "./TikTokLockAd";

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
        id="TikTokLockAd"
        component={TikTokLockAd}
        durationInFrames={AD_TOTAL_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
