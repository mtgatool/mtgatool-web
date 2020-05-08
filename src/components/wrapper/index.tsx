/* eslint-disable react/prop-types */
import React from "react";
import css from "./wrapper.css";

interface WrapperProps {
  children: JSX.Element | JSX.Element[];
  style?: React.CSSProperties;
}

export function WrapperInner(props: WrapperProps): JSX.Element {
  const { children, style } = props;
  return (
    <div style={style} className={css.wrapperInner}>
      {children}
    </div>
  );
}

export function WrapperInnerCentered(props: WrapperProps): JSX.Element {
  const { children, style } = props;
  return (
    <div style={style} className={css.wrapperInnerCentered}>
      {children}
    </div>
  );
}

export function WrapperOuter(props: WrapperProps): JSX.Element {
  const { children, style } = props;
  return (
    <div style={style} className={css.wrapperOuter}>
      {children}
    </div>
  );
}

export function WrapperOuterLight(props: WrapperProps): JSX.Element {
  const { children, style } = props;
  return (
    <div style={style} className={css.wrapperOuterLight}>
      {children}
    </div>
  );
}
