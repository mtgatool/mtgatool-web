/* eslint-disable react/prop-types */
import React from "react";
// import { Link } from 'react-router-dom';
import css from "./title.css";

interface TopTitleProps {
  subtitle?: string;
  title: string;
}

function TopTitle(props: TopTitleProps): JSX.Element {
  const { subtitle, title } = props;
  return (
    <>
      <div className={css.topTitleContainer}>{title}</div>
      {subtitle ? (
        <div className={css.topSubtitleContainer}>{subtitle}</div>
      ) : (
        <></>
      )}
    </>
  );
}

export default TopTitle;
