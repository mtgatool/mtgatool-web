/* eslint-disable react/prop-types */
import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import keyArt from "../../images/key-art.jpg";
import { WrapperOuter } from "../wrapper";
import css from "./docs.css";
import docs from "./index.yml";
import introduction from "./resources/introduction.yml";
import installation from "./resources/installation.yml";

const resources = {
  introduction: introduction,
  installation: installation
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
      <div className={css["docs-wrapper"]}>
        <div className={css["docs-sidebar"]}>
          {docs.docs.map(title => {
            const path = docs[title].path;
            const isActive = sectionMatch.params.section == path;
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
          })}
        </div>
        <div className={css["docs-main"]}>
          {resource ? (
            Object.keys(resource.content).map((key, i) => {
              return (
                <React.Fragment key={"text-" + i}>
                  <h2>{key}</h2>
                  {parseContent(resource.content[key], 0)}
                </React.Fragment>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </WrapperOuter>
  );
}

function parseContent(content, d) {
  let depth = d + 1;
  return Object.keys(content).map((key, i) => {
    if (key.startsWith("a")) {
      return (
        <a key={key + "-" + d} href={content[key].src}>
          {content[key].text}
        </a>
      );
    } else if (key.startsWith("b")) {
      return <b key={key + "-" + d}>{parseContent(content[key], depth)}</b>;
    } else if (key.startsWith("i")) {
      return <i key={key + "-" + d}>{parseContent(content[key], depth)}</i>;
    } else if (key.startsWith("text")) {
      return (
        <div key={key + "-" + d} className={css["docs-text"]}>
          {parseContent(content[key], depth)}
        </div>
      );
    } else if (key.startsWith("code")) {
      return (
        <div key={key + "-" + d} className={css["docs-code"]}>
          {" "}
          {parseContent(content[key], depth)}{" "}
        </div>
      );
    } else {
      return <React.Fragment key={i + "-" + d}>{content[key]}</React.Fragment>;
    }
  });
}
