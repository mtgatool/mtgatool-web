import AppleLogo from "../svg/AppleLogo";
import GithubLogo from "../svg/GithubLogo";
import LinuxLogo from "../svg/LinuxLogo";
import WindowsLogo from "../svg/WindowsLogo";
import { GITHUB_ORG_PAGE } from "../../lib/github";

import styles from "../../styles/Home.module.scss";

/**
 * The two things about the tool that the page never actually said: it is open
 * source, and it runs everywhere. Sits right under the hero's download buttons
 * so it is read together with them — the download button only ever names the
 * visitor's own OS, which made the tool look single-platform.
 *
 * Each icon carries its own `role="img"` label rather than being decorative,
 * so the row is announced as "Works on Windows, macOS, Linux" and is not just
 * three unexplained shapes to a screen reader.
 */
export default function OpenSourceBadge(): JSX.Element {
  return (
    <div className={styles.openSourceBar}>
      <a
        className={styles.openSourceLink}
        href={GITHUB_ORG_PAGE}
        target="_blank"
        rel="noreferrer"
      >
        <GithubLogo />
        Free and open source
      </a>
      <div className={styles.openSourceDivider} />
      <div className={styles.platformSupport}>
        <span>Works on</span>
        <span className={styles.platformIcon} role="img" aria-label="Windows">
          <WindowsLogo />
        </span>
        <span className={styles.platformIcon} role="img" aria-label="macOS">
          <AppleLogo />
        </span>
        <span
          className={`${styles.platformIcon} ${styles.platformIconLinux}`}
          role="img"
          aria-label="Linux"
        >
          <LinuxLogo />
        </span>
      </div>
    </div>
  );
}
