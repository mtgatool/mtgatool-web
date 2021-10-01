import "./wrapper.css";

interface WrapperProps {
  children: JSX.Element | JSX.Element[];
  style?: React.CSSProperties;
}

export function WrapperInner(props: WrapperProps): JSX.Element {
  const { children, style } = props;
  return (
    <div style={style} className="wrapper-inner">
      {children}
    </div>
  );
}

export function WrapperInnerCentered(props: WrapperProps): JSX.Element {
  const { children, style } = props;
  return (
    <div style={style} className="wrapper-inner-centered">
      {children}
    </div>
  );
}

export function WrapperOuter(props: WrapperProps): JSX.Element {
  const { children, style } = props;
  return (
    <div style={style} className="wrapper-outer">
      {children}
    </div>
  );
}

export function WrapperOuterLight(props: WrapperProps): JSX.Element {
  const { children, style } = props;
  return (
    <div style={style} className="wrapper-outer-light">
      {children}
    </div>
  );
}

export function WrapperOuterDark(props: WrapperProps): JSX.Element {
  const { children, style } = props;
  return (
    <div style={style} className="wrapper-outer-dark">
      {children}
    </div>
  );
}
