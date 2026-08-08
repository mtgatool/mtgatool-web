import Link from "next/link";

import styles from "../../styles/CookieConsent.module.scss";

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
}

/**
 * Asked before Google Analytics loads rather than after, so declining actually
 * means no gtag.js and no cookie — not a cookie that was already set by the
 * time the question appeared.
 *
 * Deliberately not a modal: it does not trap focus or block the page, because
 * nothing here needs answering before the site can be read. Declining is one
 * click, same as accepting, which is the part of a consent banner that is
 * easiest to get wrong.
 */
function CookieConsent(props: CookieConsentProps): JSX.Element {
  const { onAccept, onDecline } = props;

  return (
    <div className={styles.consentBanner} role="region" aria-label="Cookies">
      <p className={styles.consentText}>
        We use cookies to improve your experience. Read our {" "}
        <Link href="/docs/privacy">
          <a className={styles.consentLink}>Privacy policy</a>
        </Link>
      </p>
      <div className={styles.consentActions}>
        <button
          type="button"
          className={`githubButton ${styles.consentButton}`}
          onClick={onDecline}
        >
          Decline
        </button>
        <button
          type="button"
          className={`downloadButton ${styles.consentButton} ${styles.consentPrimary}`}
          onClick={onAccept}
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default CookieConsent;
