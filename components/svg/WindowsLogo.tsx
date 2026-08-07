import { CSSProperties } from "react";

/**
 * Windows mark: the four panes, drawn with the logo's slight perspective —
 * the outer corners pull away from the centre, so the top edge rises to the
 * right and the bottom edge drops to the right.
 */
export default function WindowsLogo(props: {
  style?: CSSProperties;
}): JSX.Element {
  const { style } = props;

  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 3.45 9.75 2.1v9.45H0z" />
      <path d="M10.95 1.95 24 0v11.4H10.95z" />
      <path d="M0 12.6h9.75v9.45L0 20.7z" />
      <path d="M10.95 12.6H24V24l-13.05-1.95z" />
    </svg>
  );
}
