import { CSSProperties } from "react";

export default function Section(
  props: React.PropsWithChildren<{ className?: string; style?: CSSProperties }>
): JSX.Element {
  const { style, children, className } = props;
  return (
    <div
      className={className}
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
