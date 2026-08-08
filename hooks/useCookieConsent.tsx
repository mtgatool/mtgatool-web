import { useCallback, useEffect, useState } from "react";

/**
 * "pending" while we have not yet looked the answer up, "unset" once we know
 * the visitor has not given one.
 */
export type ConsentState = "pending" | "unset" | "granted" | "denied";

const STORAGE_KEY = "mtgatool-cookie-consent";

interface CookieConsent {
  consent: ConsentState;
  accept: () => void;
  decline: () => void;
}

/**
 * Remembers whether the visitor agreed to analytics cookies.
 *
 * Starts at "pending" instead of reading localStorage during render: the
 * server cannot know the answer, so reading it inline would render one thing
 * on the server and another on the client and break hydration. Both the banner
 * and Google Analytics stay out of the tree until the effect has run, which
 * costs a frame and buys a stable first paint.
 */
export default function useCookieConsent(): CookieConsent {
  const [consent, setConsent] = useState<ConsentState>("pending");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      setConsent(
        stored === "granted" || stored === "denied" ? stored : "unset"
      );
    } catch {
      // Safari in private mode throws on access rather than returning null.
      // Someone whose browser cannot store an answer should still get the
      // site, just without the analytics they were never able to agree to.
      setConsent("denied");
    }
  }, []);

  const remember = useCallback((answer: "granted" | "denied") => {
    setConsent(answer);
    try {
      window.localStorage.setItem(STORAGE_KEY, answer);
    } catch {
      // The answer still holds for this page load; we ask again on the next.
    }
  }, []);

  return {
    consent,
    accept: useCallback(() => remember("granted"), [remember]),
    decline: useCallback(() => remember("denied"), [remember]),
  };
}
