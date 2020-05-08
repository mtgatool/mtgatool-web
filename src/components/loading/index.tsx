import React from "react";
import css from "./loading.css";
import { useWebContext } from "../../web-provider";
import {
  STATE_IDLE,
  STATE_DOWNLOAD,
  STATE_ERROR
} from "../../shared/constants";

function Loading(): JSX.Element {
  const webContext = useWebContext();

  const loadingStyle = (ctx): React.CSSProperties => {
    if (ctx.queryState == STATE_DOWNLOAD) {
      return {
        display: "block"
      };
    }
    if (ctx.queryState == STATE_IDLE) {
      return {
        display: "none",
        animation: "none"
      };
    }
    if (ctx.queryState == STATE_ERROR) {
      return {
        display: "none"
      };
    }
    return {};
  };

  return (
    <div style={loadingStyle(webContext)} className={css.loadingDiv}></div>
  );
}

export default Loading;
