import { CSSProperties } from "react";

import CardUgin from "../svg/OverlayUgin";
import CardForest from "../svg/OverlayForest";
import CardGrowth from "../svg/OverlayGrowthSpiral";
import CardHydroid from "../svg/OverlayHydroidKrasis";
import OverlayBack from "../svg/OverlayBack";
import OverlayDetails from "../svg/OverlayDetails";
import useParallax from "../../hooks/useParallax";
import styles from "../../styles/Home.module.scss";

export default function ShowcaseOverlay(): JSX.Element {
  const containerRef = useParallax(152);

  const defaultStyle: CSSProperties = {
    height: "42.01px",
    position: "absolute",
  };

  return (
    <div
      ref={containerRef}
      className={styles.showcaseSvg}
      style={{
        display: "flex",
        width: "466.1px",
        height: "400.15px",
        margin: "0px 4em 0px auto",
      }}
    >
      <OverlayDetails
        style={{
          width: "466.1px",
          height: "400.15px",
          position: "absolute",
          transform: `translate3d(0px, calc(var(--parallax, 0px) / -6), 0)`,
        }}
      />
      <OverlayBack
        style={{
          width: "242.91px",
          height: "392.07px",
          position: "absolute",
          transform: `translate3d(110px, 4px, 0px)`,
        }}
      />
      <CardUgin
        style={{
          width: "326.24px",
          transform: `translate3d(70px, calc(86px + var(--parallax, 0px) / 9.5), 0)`,
          ...defaultStyle,
        }}
      />
      <CardForest
        style={{
          width: "244.08px",
          transform: `translate3d(58px, calc(155px + var(--parallax, 0px) / 5.2), 0)`,
          ...defaultStyle,
        }}
      />
      <CardGrowth
        style={{
          width: "280.27px",
          transform: `translate3d(36px, calc(231px + var(--parallax, 0px) / 6.3), 0)`,
          ...defaultStyle,
        }}
      />
      <CardHydroid
        style={{
          width: "321.83px",
          transform: `translate3d(64px, calc(296px + var(--parallax, 0px) / 7.2), 0)`,
          ...defaultStyle,
        }}
      />
    </div>
  );
}
