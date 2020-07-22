import React, { CSSProperties } from "react";
import CollectionDetails from "../../assets/images/svg/collection-details.svg";
import CollectionBack from "../../assets/images/svg/collection-back.svg";
import CollectionBar from "../../assets/images/svg/collection-bar.svg";
import CollectionSet from "../../assets/images/svg/collection-set.svg";
import CollectionStats from "../../assets/images/svg/collection-stats.svg";

import { useSelector } from "react-redux";
import { AppState } from "../../redux/stores/webStore";

export default function ShowcaseCollection(): JSX.Element {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const scroll = useSelector((state: AppState) => state.web.scroll);
  const offset = containerRef.current
    ? containerRef.current.offsetTop + 150 - window.innerHeight / 2 - scroll
    : 0;

  const defaultStyle: CSSProperties = {
    transition: "all 0.1s ease-in 0s",
    position: "absolute"
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        width: "509.87px",
        height: "360.01px",
        margin: "0 auto 0 4em"
      }}
    >
      <CollectionDetails
        style={{
          width: "509.87px",
          height: "360.01px",
          transform: `translate3d(0px, ${Math.round(-offset / 8)}px, 0)`,
          ...defaultStyle
        }}
      />
      <CollectionBack
        style={{
          width: "393.48px",
          height: "274.3px",
          transform: `translate3d(58px, 33px, 0px)`,
          ...defaultStyle
        }}
      />
      <CollectionBar
        style={{
          width: "407.24px",
          height: "32.0px",
          transform: `translate3d(12px, ${Math.round(
            75 + Math.max(0, offset / 10)
          )}px, 0)`,
          ...defaultStyle
        }}
      />
      <CollectionStats
        style={{
          width: "245.65px",
          height: "194.49px",
          transform: `translate3d(173px, ${Math.round(
            130 + Math.max(0, offset / 8)
          )}px, 0)`,
          ...defaultStyle
        }}
      />
      <CollectionSet
        style={{
          width: "100.52px",
          height: "173.44px",
          transform: `translate3d(45px, ${Math.round(
            120 + Math.max(0, offset / 9)
          )}px, 0)`,
          ...defaultStyle
        }}
      />
    </div>
  );
}
