import React from "react";
import css from "./loading.css";
import { useWebContext } from "../../web-provider";
import {
  STATE_IDLE,
  STATE_DOWNLOAD,
  STATE_ERROR
} from "../../shared/constants";

function Loading() {
  const webContext = useWebContext();

  const loadingStyle = ctx => {
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
  };

  return (
    <div style={loadingStyle(webContext)} className={css["loading-div"]}></div>
  );
}

export default Loading;
