import styles from "../../styles/Wrapper.module.scss";

interface WrapperProps {
  children: JSX.Element | JSX.Element[];
  style?: React.CSSProperties;
}

export function WrapperInner(props: WrapperProps): JSX.Element {
  const { children, style } = props;
  return (
    <div style={style} className={styles.wrapperInner}>
      {children}
    </div>
  );
}

export function WrapperInnerCentered(props: WrapperProps): JSX.Element {
  const { children, style } = props;
  return (
    <div style={style} className={styles.wrapperInnerCentered}>
      {children}
    </div>
  );
}

export function WrapperOuter(props: WrapperProps): JSX.Element {
  const { children, style } = props;
  return (
    <div style={style} className={styles.wrapperOuter}>
      {children}
    </div>
  );
}

export function WrapperOuterLight(props: WrapperProps): JSX.Element {
  const { children, style } = props;
  return (
    <div style={style} className={styles.wrapperOuterLight}>
      {children}
    </div>
  );
}

export function WrapperOuterDark(props: WrapperProps): JSX.Element {
  const { children, style } = props;
  return (
    <div style={style} className={styles.wrapperOuterDark}>
      {children}
    </div>
  );
}
