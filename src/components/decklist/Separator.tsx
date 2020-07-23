import React, { PropsWithChildren } from "react";

export default function Separator(props: PropsWithChildren<{}>): JSX.Element {
  const { children } = props;
  return (
    <div
      style={{
        color: "var(--color-text)",
        maxWidth: "800px",
        margin: "0 auto",
        height: "32px",
        maxHeight: "32px",
        verticalAlign: "middle",
        lineHeight: "32px",
        textAlign: "center",
        fontFamily: "belerenbold",
        alignSelf: "center"
      }}
    >
      {children}
    </div>
  );
}
