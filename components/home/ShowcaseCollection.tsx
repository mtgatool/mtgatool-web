import { CSSProperties, useRef } from "react";

import CollectionDetails from "../svg/CollectionDetails";
import CollectionBack from "../svg/CollectionBack";
import CollectionBar from "../svg/CollectionBar";
import CollectionSet from "../svg/CollectionSet";
import CollectionStats from "../svg/CollectionStats";

interface ScrollProps {
  scroll: number
}

export default function ShowcaseCollection(props: ScrollProps): JSX.Element {
  const { scroll } = props;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const offset = containerRef.current
    ? containerRef.current.offsetTop + 150 - window.innerHeight / 2 - scroll
    : 0;

  const defaultStyle: CSSProperties = {
    transition: "all 0.1s ease-in 0s",
    position: "absolute",
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        width: "509.87px",
        height: "360.01px",
        margin: "0px 4em 0px auto",
      }}
    >
      <CollectionDetails
        style={{
          width: "509.87px",
          height: "360.01px",
          transform: `translate3d(0px, ${Math.round(-offset / 8)}px, 0)`,
          ...defaultStyle,
        }}
      />
      <CollectionBack
        style={{
          width: "393.48px",
          height: "274.3px",
          transform: `translate3d(58px, 33px, 0px)`,
          ...defaultStyle,
        }}
      />
      <CollectionBar
        style={{
          width: "407.24px",
          height: "32.0px",
          transform: `translate3d(12px, ${Math.round(
            75 + (offset / 10)
          )}px, 0)`,
          ...defaultStyle,
        }}
      />
      <CollectionStats
        style={{
          width: "245.65px",
          height: "194.49px",
          transform: `translate3d(173px, ${Math.round(
            130 + (offset / 8)
          )}px, 0)`,
          ...defaultStyle,
        }}
      />
      <CollectionSet
        style={{
          width: "100.52px",
          height: "173.44px",
          transform: `translate3d(45px, ${Math.round(
            120 + (offset / 9)
          )}px, 0)`,
          ...defaultStyle,
        }}
      />
    </div>
  );
}
