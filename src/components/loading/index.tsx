import React from "react";
import css from "./loading.css";
import { STATE_IDLE, STATE_DOWNLOAD, STATE_ERROR } from "../../constants";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/stores/webStore";

function Loading(): JSX.Element {
  const { loadingState } = useSelector((state: AppState) => state.web);

  let loadingStyle: React.CSSProperties = {};

  if (loadingState == STATE_DOWNLOAD) {
    loadingStyle = {
      display: "block"
    };
  }
  if (loadingState == STATE_IDLE) {
    loadingStyle = {
      display: "none",
      animation: "none"
    };
  }
  if (loadingState == STATE_ERROR) {
    loadingStyle = {
      display: "none"
    };
  }

  return <div style={loadingStyle} className={css.loadingDiv}></div>;
}

export default Loading;
