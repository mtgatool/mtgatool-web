/* eslint-disable react/prop-types */
import React, { useCallback } from "react";
import css from "./cookies.css";
import metaCss from "../metagame/metagame.css";

function CookiesSign(): JSX.Element {
  const [show, setShow] = React.useState(true);

  const hide = useCallback(() => {
    localStorage._ck = true;
    setShow(false);
  }, []);

  React.useEffect(() => {
    if (localStorage._ck) {
      hide();
    }
  }, [hide]);

  return (
    <>
      {show ? (
        <div className={css.cookieBanner}>
          <div className={css.cookieText}>
            This website uses cookies to improve use experience by storing data
            on your browser and uses analytics data of Google Analytics
            services. By using this website you agree with our Privacy policy
            and terms of service.
          </div>
          <div onClick={hide} className={metaCss.buttonSimple}>
            I agree
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default CookiesSign;
