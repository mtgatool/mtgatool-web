import { CSSProperties } from "react";

import CollectionDetails from "../svg/CollectionDetails";
import CollectionBack from "../svg/CollectionBack";
import CollectionBar from "../svg/CollectionBar";
import CollectionSet from "../svg/CollectionSet";
import CollectionStats from "../svg/CollectionStats";
import useParallax from "../../hooks/useParallax";
import styles from "../../styles/Home.module.scss";

export default function ShowcaseCollection(): JSX.Element {
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
        width: "509.87px",
        height: "360.01px",
        margin: "0px 4em 0px auto",
      }}
    >
      <CollectionDetails
        style={{
          width: "509.87px",
          height: "360.01px",
          transform: `translate3d(0px, calc(var(--parallax, 0px) / -8), 0)`,
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
          transform: `translate3d(12px, calc(75px + var(--parallax, 0px) / 10), 0)`,
          ...defaultStyle,
        }}
      />
      <CollectionStats
        style={{
          width: "245.65px",
          height: "194.49px",
          transform: `translate3d(173px, calc(130px + var(--parallax, 0px) / 8), 0)`,
          ...defaultStyle,
        }}
      />
      <CollectionSet
        style={{
          width: "100.52px",
          height: "173.44px",
          transform: `translate3d(45px, calc(120px + var(--parallax, 0px) / 9), 0)`,
          ...defaultStyle,
        }}
      />
    </div>
  );
}
