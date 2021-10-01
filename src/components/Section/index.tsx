import { CSSProperties } from "react";

export default function Section(
  props: React.PropsWithChildren<{ style?: CSSProperties }>
): JSX.Element {
  const { style, children } = props;
  return (
    <div
      style={{
        display: "flex",
        borderRadius: "2px",
        backgroundColor: `var(--color-section)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
