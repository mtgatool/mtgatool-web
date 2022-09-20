
interface FeatureProps {
  title: string;
  subtitle: string;
}

export default function Feature(props: FeatureProps): JSX.Element {
  const { title, subtitle } = props;
  return (
    <div
      style={{
        backgroundColor: "var(--color-section)",
        borderLeft: "4px solid var(--color-g)",
        borderRadius: "4px",
        padding: "16px",
        maxWidth: "32em",
        height: "9em",
        margin: "auto",
      }}
    >
      <h1
        style={{
          marginBlock: "0",
          marginInline: "0",
          fontSize: "1.7em",
          color: "var(--color-text)",
          fontFamily: "var(--main-font-name-bold)",
        }}
      >
        {title}
      </h1>
      <p style={{ fontFamily: "var(--sub-font-name)", marginTop: "1em" }}>
        {subtitle}
      </p>
    </div>
  );
}
