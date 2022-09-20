interface FeatureProps {
  title: string;
  subtitle: string;
}

export default function FeatureRight(props: FeatureProps): JSX.Element {
  const { title, subtitle } = props;
  return (
    <div
      style={{
        backgroundColor: "var(--color-section)",
        borderRight: "4px solid var(--color-g)",
        borderRadius: "4px",
        padding: "16px",
        maxWidth: "32em",
        height: "11em",
        margin: "auto",
      }}
    >
      <h2
        style={{
          marginBlock: "0",
          marginInline: "0",
          fontSize: "1.7em",
          color: "var(--color-text)",
          fontFamily: "var(--main-font-name-bold)",
        }}
      >
        {title}
      </h2>
      <p style={{ fontFamily: "var(--sub-font-name)", marginTop: "1em" }}>
        {subtitle}
      </p>
    </div>
  );
}
