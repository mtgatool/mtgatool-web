import React, { CSSProperties } from "react";
import {ReactComponent as CardUgin } from "../../assets/images/svg/overlay-ugin.svg";
import {ReactComponent as CardForest } from "../../assets/images/svg/overlay-forest.svg";
import {ReactComponent as CardGrowth } from "../../assets/images/svg/overlay-growth-spiral.svg";
import {ReactComponent as CardHydroid } from "../../assets/images/svg/overlay-hydroid-krasis.svg";
import {ReactComponent as OverlayBack } from "../../assets/images/svg/overlay-back.svg";
import {ReactComponent as OverlayDetails } from "../../assets/images/svg/overlay-details.svg";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/stores/webStore";

export default function ShowcaseOverlay(): JSX.Element {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const scroll = useSelector((state: AppState) => state.web.scroll);
  const offset = containerRef.current
    ? containerRef.current.offsetTop + 152 - window.innerHeight / 2 - scroll
    : 0;

  const defaultStyle: CSSProperties = {
    transition: "all 0.1s ease-in 0s",
    height: "42.01px",
    position: "absolute"
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        width: "466.1px",
        height: "400.15px",
        margin: "0px 4em 0px auto"
      }}
    >
      <OverlayDetails
        style={{
          width: "466.1px",
          height: "400.15px",
          position: "absolute",
          transform: `translate3d(0px, ${Math.round(-offset / 6)}px, 0)`
        }}
      />
      <OverlayBack
        style={{
          width: "242.91px",
          height: "392.07px",
          position: "absolute",
          transform: `translate3d(110px, 4px, 0px)`
        }}
      />
      <CardUgin
        style={{
          width: "326.24px",
          transform: `translate3d(70px, ${Math.round(
            76 + Math.max(0, offset / 9.5)
          )}px, 0)`,
          ...defaultStyle
        }}
      />
      <CardForest
        style={{
          width: "244.08px",
          transform: `translate3d(58px, ${Math.round(
            145 + Math.max(0, offset / 5.2)
          )}px, 0)`,
          ...defaultStyle
        }}
      />
      <CardGrowth
        style={{
          width: "280.27px",
          transform: `translate3d(36px, ${Math.round(
            221 + Math.max(0, offset / 6.3)
          )}px, 0)`,
          ...defaultStyle
        }}
      />
      <CardHydroid
        style={{
          width: "321.83px",
          transform: `translate3d(64px, ${Math.round(
            286 + Math.max(0, offset / 7.2)
          )}px, 0)`,
          ...defaultStyle
        }}
      />
    </div>
  );
}
