/* eslint-disable react/prop-types */
import React from "react";
import css from "./cookies.css";
import metaCss from "../metagame/metagame.css";

function CookiesSign() {
  const [show, setShow] = React.useState(true);

  function hide() {
    localStorage._ck = true;
    setShow(false);
  }

  React.useState(() => {
    if (localStorage._ck) {
      hide();
    }
  }, []);

  return (
    <>
      {show ? (
        <div className={css["cookie-banner"]}>
          <div className={css["cookie-text"]}>
            This website uses cookies to improve use experience by storing data
            on your browser and uses analytics data of Google Analytics
            services. By using this website you agree with our Privacy policy
            and terms of service.
          </div>
          <div onClick={hide} className={metaCss["button-simple"]}>
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
