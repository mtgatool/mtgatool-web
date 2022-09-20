import Link from "next/link";
import Image from "next/image";

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
          <Link href="/docs/introduction">
            <a className={styles.navLinkA}>Docs</a>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default TopNav;
