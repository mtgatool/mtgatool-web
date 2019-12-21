/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import css from "./topnav.css";

export function TopNav(props) {
  const { artist } = props;

  return (
    <div className={css["top-nav-container"]}>
      <div className={css["top-nav"]}>
        <div className={css["nav-logo-container"]}>
          <Link to="/" className={css["nav-logo"]} />
        </div>
        <div className={css["nav-artist"]}>{artist}</div>
        <div className={css["nav-divider"]}></div>
        <div className={css["nav-links"]}>
          <Link to="/metagame" className={css["nav-link-a"]}>
            Metagame
          </Link>
          <Link to="/register" className={css["nav-link-a"]}>
            Register
          </Link>
          <Link to="/release-notes" className={css["nav-link-a"]}>
            Release Notes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
