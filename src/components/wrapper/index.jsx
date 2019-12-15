/* eslint-disable react/prop-types */
import React from "react";
import css from "./wrapper.css";

export function WrapperInner(props) {
  const { children, style } = props;
  return (
    <div style={style} className={css["wrapper-inner"]}>
      {children}
    </div>
  );
}

export function WrapperOuter(props) {
  const { children, style } = props;
  return (
    <div style={style} className={css["wrapper-outer"]}>
      {children}
    </div>
  );
}

export function WrapperOuterLight(props) {
  const { children, style } = props;
  return (
    <div style={style} className={css["wrapper-outer-light"]}>
      {children}
    </div>
  );
}
