/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import css from "./topnav.css";

interface TopNavProps {
  artist: string;
}

export function TopNav(props: TopNavProps): JSX.Element {
  const { artist } = props;

  return (
    <div className={css.topNavContainer}>
      <div className={css.topNav}>
        <div className={css.navLogoContainer}>
          <Link to="/" className={css.navLogo} />
        </div>
        <div className={css.navArtist}>{artist}</div>
        <div className={css.navDivider}></div>
        <div className={css.navLinks}>
          {/* <Link to="/metagame" className={css.navLinkA}>
            Metagame
          </Link> */}
          <Link to="/register" className={css.navLinkA}>
            Register
          </Link>
          <Link to="/release-notes" className={css.navLinkA}>
            Release Notes
          </Link>
          <Link to="/docs" className={css.navLinkA}>
            Docs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
