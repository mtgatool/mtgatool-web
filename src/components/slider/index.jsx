/* eslint-disable react/prop-types */
import React from "react";
import css from "./slider.css";

function Slider(props) {
  const { min, max, step, onChange } = props;

  return (
    <div className={css["slidecontainer"]}>
      <input
        className={css["slider"]}
        type="range"
        min={min ? min : 0}
        max={max ? max : 10}
        step={step ? step : 1}
        onChange={onChange}
      ></input>
    </div>
  );
}

export default Slider;
