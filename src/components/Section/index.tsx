import React, { CSSProperties } from "react";

export default function Section(
  props: React.PropsWithChildren<{ style?: CSSProperties }>
): JSX.Element {
  return (
    <div
      style={{
        display: "flex",
        borderRadius: "2px",
        backgroundColor: `var(--color-section)`,
        ...props.style
      }}
    >
      {props.children}
    </div>
  );
}
