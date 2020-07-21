import React, { PropsWithChildren } from "react";

export default function Flex(props: PropsWithChildren<any>): JSX.Element {
  return (
    <div {...props} style={{ ...props.style, display: "flex" }}>
      {props.children}
    </div>
  );
}
