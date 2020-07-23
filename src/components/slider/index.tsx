import React, { useState } from "react";
import css from "./slider.css";

export class SliderPosition {
  public text: string;
  public hide: boolean;
  public color: string;

  constructor(_text = "", _hide = false, _color = "var(--color-text-dark)") {
    this.text = _text;
    this.hide = _hide;
    this.color = _color;
  }
}

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange: (value: number) => void;
  onInput?: (value: number) => void;
  positions?: SliderPosition[];
  containerStyle?: React.CSSProperties;
}

export default function Slider(props: SliderProps): JSX.Element {
  const { onChange, onInput } = props;
  const min = props.min || 0;
  const max = props.max || 10;
  const step = props.step || 1;
  const [value, setValue] = useState(props.value);

  const stepsNumber = (max - min) / step;
  const posArray: SliderPosition[] =
    props.positions || Array(stepsNumber + 1).fill(new SliderPosition());

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = parseFloat(e.currentTarget.value);
    setValue(val);
    if (onChange) {
      onChange(val);
    }
  };

  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = parseFloat(e.currentTarget.value);
    setValue(val);
    if (onInput) {
      onInput(val);
    }
  };

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const percent = (100 / (max - min)) * ((value || 0) - min);

  return (
    <div style={props.containerStyle} className={css.slidecontainer}>
      <input
        style={{
          background: `linear-gradient(90deg, var(--color-button) ${percent}%, var(--color-section) ${percent}%)`
        }}
        type="range"
        value={value || 0}
        min={min}
        max={max}
        step={step}
        onChange={handleOnChange}
        onInput={handleOnInput}
      ></input>
      <div className={css.sliderMarksContainerHor}>
        {posArray.map((c: SliderPosition, i: number) => {
          return (
            <div className={css.sliderMarkOuter} key={c.text + "-" + i}>
              <div
                className={css.sliderMarkHor}
                style={{ backgroundColor: c.color, opacity: c.hide ? 0 : 1 }}
              />
              {c.text !== "" && (
                <div className={css.sliderMarkText}>{c.text}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
