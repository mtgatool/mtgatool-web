import "./index.css";

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  text: string;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
}

export default function Button(props: ButtonProps): JSX.Element {
  const { disabled, text, className, style, onClick } = props;

  const _disabled = disabled && disabled === true;
  return (
    <div
      style={style || {}}
      onClick={
        _disabled
          ? (): void => {
              //
            }
          : onClick
      }
      className={
        _disabled ? "button-simple-disabled" : className ?? "button-simple"
      }
    >
      {text}
    </div>
  );
}
