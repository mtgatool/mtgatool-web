import Link from "next/link";
import Image from "next/image";

import PatreonLogo from "../svg/PatreonLogo";
import GithubLogo from "../svg/GithubLogo";
import { GITHUB_ORG_PAGE } from "../../lib/github";
import styles from "../../styles/Topnav.module.scss";

interface TopNavProps {
  artist: string;
}

export function TopNav(props: TopNavProps): JSX.Element {
  const { artist } = props;

  return (
    <div className={styles.topNavContainer}>
      <nav className={styles.topNav}>
        <Link href="/">
          <a className={styles.navLogoContainer}>
            <Image src="/cssimages/logo_big.png" alt="" layout="fixed" height={64} width={320} />
          </a>
        </Link>
        <div className={styles.navArtist}>{artist}</div>
        <div className={styles.navDivider} />
        <div className={styles.navLinks}>
          <Link href="/release-notes">
            <a className={styles.navLinkA}>Release Notes</a>
          </Link>
          <Link href="/docs/installation">
            <a className={styles.navLinkA}>Docs</a>
          </Link>
          <a
            className={styles.navGithub}
            href={GITHUB_ORG_PAGE}
            target="_blank"
            rel="noreferrer"
            title="MTG Arena Tool is open source — browse the code on GitHub"
            aria-label="MTG Arena Tool on GitHub"
          >
            <GithubLogo />
          </a>
          <a
            className={styles.navPatreon}
            href="https://www.patreon.com/cw/mtgatool"
            target="_blank"
            rel="noreferrer"
            title="Support MTG Arena Tool on Patreon"
            aria-label="Support MTG Arena Tool on Patreon"
          >
            <PatreonLogo />
          </a>
        </div>
      </nav>
    </div>
  );
}

export default TopNav;
