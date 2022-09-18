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
      <div className={styles.topNav}>
        <div className={styles.navLogoContainer}>
          <Link href="/">
            <Image src="/cssimages/logo_big.png" alt="" layout="fixed" height={64} width={320} />
          </Link>
        </div>
        <div className={styles.navArtist}>{artist}</div>
        <div className={styles.navDivider} />
        <div className={styles.navLinks}>
          <Link href="/release-notes">
            <div className={styles.navLinkA}>Release Notes</div>
          </Link>
          <Link href="/docs/introduction">
            <div className={styles.navLinkA}>Docs</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
