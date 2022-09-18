import { CSSProperties, useRef } from "react";

import CardUgin from "../svg/OverlayUgin";
import CardForest from "../svg/OverlayForest";
import CardGrowth from "../svg/OverlayGrowthSpiral";
import CardHydroid from "../svg/OverlayHydroidKrasis";
import OverlayBack from "../svg/OverlayBack";
import OverlayDetails from "../svg/OverlayDetails";

interface ScrollProps {
  scroll: number
}

export default function ShowcaseOverlay(props: ScrollProps): JSX.Element {
  const { scroll } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);

  const offset = containerRef.current
    ? containerRef.current.offsetTop + 152 - window.innerHeight / 2 - scroll
    : 0;

  const defaultStyle: CSSProperties = {
    transition: "all 0.1s ease-in 0s",
    height: "42.01px",
    position: "absolute",
  };

  return (
    <div
      ref={containerRef}
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
          transform: `translate3d(0px, ${Math.round(-offset / 6)}px, 0)`,
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
          transform: `translate3d(70px, ${Math.round(
            86 + (offset / 9.5)
          )}px, 0)`,
          ...defaultStyle,
        }}
      />
      <CardForest
        style={{
          width: "244.08px",
          transform: `translate3d(58px, ${Math.round(
            155 + (offset / 5.2)
          )}px, 0)`,
          ...defaultStyle,
        }}
      />
      <CardGrowth
        style={{
          width: "280.27px",
          transform: `translate3d(36px, ${Math.round(
            231 + (offset / 6.3)
          )}px, 0)`,
          ...defaultStyle,
        }}
      />
      <CardHydroid
        style={{
          width: "321.83px",
          transform: `translate3d(64px, ${Math.round(
            296 + (offset / 7.2)
          )}px, 0)`,
          ...defaultStyle,
        }}
      />
    </div>
  );
}
