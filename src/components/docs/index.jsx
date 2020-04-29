/* eslint-disable react/prop-types */
import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import keyArt from "../../images/key-art.jpg";
import { WrapperOuter } from "../wrapper";

import logoTool from "../../cssimages/icon-256.png";

import css from "./docs.css";
import docs from "./index.yml";
import introduction from "!!raw-loader!./resources/introduction.md";
import installation from "!!raw-loader!./resources/installation.md";
import outputLogs from "!!raw-loader!./resources/output-logs.md";
import decks from "!!raw-loader!./resources/decks.md";
import ReactMarkdown from "react-markdown";

const resources = {
  introduction: introduction,
  installation: installation,
  "output-logs": outputLogs,
  decks: decks
};

export default function Docs(props) {
  const { setImage } = props;

  const sectionMatch = useRouteMatch("/docs/:section");
  // const linkMatch = useRouteMatch("/docs/:section/:link");

  const resource = resources[sectionMatch.params.section];

  React.useEffect(() => {
    setImage(keyArt);
  }, []);

  return (
    <WrapperOuter style={{ minHeight: "calc(100vh - 5px)" }}>
      <div className={css["docs-wrapper-top"]}></div>
      <div className={css["docs-wrapper"]}>
        <div className={css["docs-sidebar"]}>
          <div>
            <img
              style={{ margin: "auto " }}
              alt="MTG Arena Tool"
              className={css["top-logo"]}
              src={logoTool}
            />
          </div>
          {docs.docs.map(title => {
            const path = docs[title].path;
            const isActive = sectionMatch.params.section == path;

            if (docs[title].type == "section") {
              return (
                <div
                  className={
                    css["docs-section-link"] +
                    (isActive ? " " + css["docs-section-link-active"] : "")
                  }
                  key={title + "-side"}
                >
                  <Link to={"/docs/" + path}>{title}</Link>
                </div>
              );
            }
            if (docs[title].type == "title") {
              return (
                <div
                  className={css["docs-section-title"]}
                  key={title + "-side-title"}
                >
                  {title}
                </div>
              );
            }
          })}
        </div>
        <div className={css["docs-main"]}>
          {resource ? <ReactMarkdown source={resource}></ReactMarkdown> : <></>}
        </div>
      </div>
    </WrapperOuter>
  );
}
