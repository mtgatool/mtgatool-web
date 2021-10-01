/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import "./cookies.css";
import Button from "../button";

function CookiesSign(): JSX.Element {
  const [show, setShow] = useState(true);

  const hide = useCallback(() => {
    localStorage._ck = true;
    setShow(false);
  }, []);

  useEffect(() => {
    if (localStorage._ck) {
      hide();
    }
  }, [hide]);

  return (
    <>
      {show ? (
        <div className="cookie-banner">
          <div className="cookie-text">
            This website uses cookies to improve use experience by storing data
            on your browser and uses analytics data of Google Analytics
            services. By using this website you agree with our Privacy policy
            and terms of service.
          </div>
          <Button onClick={hide} text="I agree" />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default CookiesSign;
