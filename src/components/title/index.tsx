
// import { Link } from 'react-router-dom';
import "./title.css";

interface TopTitleProps {
  subtitle?: string;
  title: string;
}

function TopTitle(props: TopTitleProps): JSX.Element {
  const { subtitle, title } = props;
  return (
    <>
      <div className={"top-title-container"}>{title}</div>
      {subtitle ? (
        <div className={"top-subtitle-container"}>{subtitle}</div>
      ) : (
        <></>
      )}
    </>
  );
}

export default TopTitle;
