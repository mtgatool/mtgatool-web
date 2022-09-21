import styles from "../../styles/Home.module.scss";

interface FeatureProps {
  title: string;
  subtitle: string;
}

export default function Feature(props: FeatureProps): JSX.Element {
  const { title, subtitle } = props;
  return (
    <div className={styles.showcaseFeature}>
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
