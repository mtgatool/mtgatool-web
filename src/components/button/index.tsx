import React from "react";
import "./index.css";

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  text: string;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
}

export default function Button(props: ButtonProps): JSX.Element {
  const disabled = props.disabled && props.disabled === true;
  return (
    <div
      style={props.style || {}}
      onClick={disabled ? (): void => {} : props.onClick}
      className={
        disabled
          ? "button-simple-disabled"
          : props.className ?? "button-simple"
      }
    >
      {props.text}
    </div>
  );
}
