import React, { CSSProperties } from "react";
import MatchA from "../../assets/images/svg/stats-match-a.svg";
import MatchB from "../../assets/images/svg/stats-match-b.svg";
import StatsCenter from "../../assets/images/svg/stats-center.svg";
import StatsBack from "../../assets/images/svg/stats-back.svg";
import StatsDetails from "../../assets/images/svg/stats-details.svg";

import { useSelector } from "react-redux";
import { AppState } from "../../redux/stores/webStore";

export default function ShowcaseStats(): JSX.Element {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const scroll = useSelector((state: AppState) => state.web.scroll);
  const offset = containerRef.current
    ? containerRef.current.offsetTop + 210 - window.innerHeight / 2 - scroll
    : 0;

  const defaultStyle: CSSProperties = {
    transition: "all 0.2s ease-in-out 0s",
    position: "absolute"
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        width: "608.52px",
        height: "414.52px",
        margin: "0 auto 0 4em"
      }}
    >
      <StatsDetails
        style={{
          width: "608.52px",
          height: "414.52px",
          position: "absolute",
          transform: `translate3d(0x, ${Math.round(-offset / 6)}px, 0)`
        }}
      />
      <StatsBack
        style={{
          width: "462.89px",
          height: "308.59px",
          position: "absolute",
          transform: `translate3d(68px, 50px, 0px)`
        }}
      />
      <StatsCenter
        style={{
          width: "419.67px",
          height: "107.01px",
          transform: `translate3d(89px, ${Math.round(
            229 + Math.max(0, offset / 10.5)
          )}px, 0)`,
          ...defaultStyle
        }}
      />
      <MatchA
        style={{
          width: "462.5px",
          height: "64.95px",
          transform: `translate3d(0px, ${Math.round(
            60 + Math.max(0, offset / 8.2)
          )}px, 0)`,
          ...defaultStyle
        }}
      />
      <MatchB
        style={{
          width: "462.5px",
          height: "64.95px",
          transform: `translate3d(0px, ${Math.round(
            140 + Math.max(0, offset / 9.3)
          )}px, 0)`,
          ...defaultStyle
        }}
      />
    </div>
  );
}
