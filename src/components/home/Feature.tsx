import React from "react";

interface FeatureProps {
  title: string;
  subtitle: string;
}

export default function Feature(props: FeatureProps): JSX.Element {
  const { title, subtitle } = props;
  return (
    <div
      style={{
        backgroundColor: "var(--color-section)",
        borderLeft: "4px solid var(--color-g)",
        borderRadius: "4px",
        padding: "16px",
        maxWidth: "32em",
        height: "11em",
        margin: "auto"
      }}
    >
      <div
        style={{
          fontSize: "1.7em",
          color: "var(--color-text)",
          fontFamily: "var(--main-font-name-bold)"
        }}
      >
        {title}
      </div>
      <div style={{ fontFamily: "var(--sub-font-name)", marginTop: "1em" }}>
        {subtitle}
      </div>
    </div>
  );
}
