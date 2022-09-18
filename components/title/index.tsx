import styles from "../../styles/Title.module.scss";

interface TopTitleProps {
  subtitle?: string;
  title: string;
}

function TopTitle(props: TopTitleProps): JSX.Element {
  const { subtitle, title } = props;
  return (
    <>
      <div className={styles.topTitleContainer}>{title}</div>
      {subtitle ? (
        <div className={styles.topSubtitleContainer}>{subtitle}</div>
      ) : (
        <></>
      )}
    </>
  );
}

export default TopTitle;
