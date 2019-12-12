/* eslint-disable react/prop-types */
import React from "react";
// import { Link } from 'react-router-dom';
import css from "./title.css";

function TopTitle(props) {
  const { subtitle, title } = props;
  return (
    <>
      <div className={css["top-title-container"]}>{title}</div>
      {
        subtitle ? <div className={css["top-subtitle-container"]}>{subtitle}</div> : <></>
      }
      
    </>
  );
}

export default TopTitle;
