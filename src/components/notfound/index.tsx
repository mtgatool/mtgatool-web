/* eslint-disable react/prop-types */
import React from "react";
import { WrapperInner, WrapperOuter } from "../wrapper";
import css from "./notfound.css";
import notFoundImage from "../../images/404.jpg";
import { ExportViewProps } from "../../web-types/shared";

function NotFound(props: ExportViewProps): JSX.Element {
  const { setImage } = props;

  React.useEffect(() => {
    setImage(notFoundImage);
  }, []);

  return (
    <WrapperOuter style={{ minHeight: "calc(100vh - 5px)" }}>
      <WrapperInner>
        <div className={css["title-notfound"]}>Uh, oh..</div>
        <div className={css["subtitle-notfound"]}>
          We have totally lost this page..
        </div>
        <div className={css["subtitle-errorcode"]}>HTTP 404</div>
      </WrapperInner>
    </WrapperOuter>
  );
}

export default NotFound;
