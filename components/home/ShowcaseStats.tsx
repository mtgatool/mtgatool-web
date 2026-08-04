import { CSSProperties } from "react";

import MatchA from "../svg/StatsMatchA";
import MatchB from "../svg/StatsMatchB";
import StatsCenter from "../svg/StatsCenter";
import StatsBack from "../svg/StatsBack";
import StatsDetails from "../svg/StatsDetails";
import useParallax from "../../hooks/useParallax";
import styles from "../../styles/Home.module.scss";

export default function ShowcaseStats(): JSX.Element {
  const containerRef = useParallax(150);

  const defaultStyle: CSSProperties = {
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
          transform: `translate3d(0px, calc(var(--parallax, 0px) / -8), 0)`,
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
          transform: `translate3d(89px, calc(229px + var(--parallax, 0px) / 10.5), 0)`,
          ...defaultStyle,
        }}
      />
      <MatchA
        style={{
          width: "462.5px",
          height: "64.95px",
          transform: `translate3d(0px, calc(60px + var(--parallax, 0px) / 13), 0)`,
          ...defaultStyle,
        }}
      />
      <MatchB
        style={{
          width: "462.5px",
          height: "64.95px",
          transform: `translate3d(0px, calc(140px + var(--parallax, 0px) / 9.3), 0)`,
          ...defaultStyle,
        }}
      />
    </div>
  );
}
