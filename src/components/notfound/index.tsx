/* eslint-disable react/prop-types */
import React from "react";
import { WrapperOuter } from "../wrapper";
import css from "./notfound.css";
import Section from "../Section";
import notFoundImage from "../../assets/images/404.jpg";
import { reduxAction } from "../../redux/webRedux";
import { useDispatch } from "react-redux";

function NotFound(): JSX.Element {
  const dispatch = useDispatch();
  React.useEffect(() => {
    reduxAction(dispatch, { type: "SET_BACK_IMAGE", arg: notFoundImage });
  }, [dispatch]);

  return (
    <WrapperOuter style={{ minHeight: "calc(100vh - 5px)", display: "flex" }}>
      <Section
        style={{ flexDirection: "column", margin: "auto", padding: "1em 3em" }}
      >
        <div className={css.titleNotfound}>Uh, oh..</div>
        <div className={css.subtitleNotfound}>
          We have totally lost this page..
        </div>
        <div className={css.subtitleErrorcode}>HTTP 404</div>
      </Section>
    </WrapperOuter>
  );
}

export default NotFound;
