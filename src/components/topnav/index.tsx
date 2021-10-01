import { Link } from "react-router-dom";
import "./topnav.css";

interface TopNavProps {
  artist: string;
}

export function TopNav(props: TopNavProps): JSX.Element {
  const { artist } = props;

  return (
    <div className="top-nav-container">
      <div className="top-nav">
        <div className="nav-logo-container">
          <Link to="/" className="nav-logo" />
        </div>
        <div className="nav-artist">{artist}</div>
        <div className="nav-divider" />
        <div className="nav-links">
          {/* <Link to="/metagame" className={"nav-link-a"}>
            Metagame
          </Link> */}
          <Link to="/register" className="nav-link-a">
            Register
          </Link>
          <Link to="/release-notes" className="nav-link-a">
            Release Notes
          </Link>
          <Link to="/docs" className="nav-link-a">
            Docs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
