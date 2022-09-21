import { CSSProperties, useRef } from "react";

import MatchA from "../svg/StatsMatchA";
import MatchB from "../svg/StatsMatchB";
import StatsCenter from "../svg/StatsCenter";
import StatsBack from "../svg/StatsBack";
import StatsDetails from "../svg/StatsDetails";
import styles from "../../styles/Home.module.scss";

interface ScrollProps {
  scroll: number
}

export default function ShowcaseStats(props: ScrollProps): JSX.Element {
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
      className={styles.showcaseSvg}
      style={{
        display: "flex",
        width: "608.52px",
        height: "414.52px",
        margin: "0 auto 0 4em",
      }}
    >
      <StatsDetails
        style={{
          width: "608.52px",
          height: "414.52px",
          transform: `translate3d(0px, ${Math.round(-offset / 8)}px, 0)`,
          ...defaultStyle,
        }}
      />
      <StatsBack
        style={{
          width: "462.89px",
          height: "308.59px",
          transform: `translate3d(68px, 50px, 0px)`,
          ...defaultStyle,
        }}
      />
      <StatsCenter
        style={{
          width: "419.67px",
          height: "107.01px",
          transform: `translate3d(89px, ${Math.round(
            229 + (offset / 10.5)
          )}px, 0)`,
          ...defaultStyle,
        }}
      />
      <MatchA
        style={{
          width: "462.5px",
          height: "64.95px",
          transform: `translate3d(0px, ${Math.round(
            60 + (offset / 13)
          )}px, 0)`,
          ...defaultStyle,
        }}
      />
      <MatchB
        style={{
          width: "462.5px",
          height: "64.95px",
          transform: `translate3d(0px, ${Math.round(
            140 + (offset / 9.3)
          )}px, 0)`,
          ...defaultStyle,
        }}
      />
    </div>
  );
}
