/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";
import { useRouteMatch, useLocation, Link } from "react-router-dom";
import { WrapperOuter } from "../wrapper";
import css from "./docs.css";
import keyArt from "../../images/key-art.jpg";
import logoTool from "../../cssimages/icon-256.png";

// Docs
import docs from "./index.yml";
import introduction from "!!raw-loader!./resources/introduction.md";
import installation from "!!raw-loader!./resources/installation.md";
import outputLogs from "!!raw-loader!./resources/output-logs.md";
import privacy from "!!raw-loader!./resources/privacy.md";
import decks from "!!raw-loader!./resources/decks.md";
import collection from "!!raw-loader!./resources/collection.md";
import overlays from "!!raw-loader!./resources/overlays.md";

// Images
import detailedLogsImg from "../../images/docs/detailed-logs.png";
import ReactMarkdown from "react-markdown";

const resources = {
  introduction: introduction,
  installation: installation,
  "output-logs": outputLogs,
  privacy: privacy,
  decks: decks,
  collection: collection,
  overlays: overlays
};

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);

const imageTransform = img => {
  switch (img) {
    case "detailed-logs.png":
      return detailedLogsImg;
    default:
      return img;
  }
};

function Heading({ children, ...props }) {
  const { level } = props;
  return React.createElement("h" + level, props, children);
}

const HeadRenderer = props => {
  const { nodeKey, children, level } = props;
  const linkRef = useRef(null);
  const id = children[0].props.value.replace(/\s+/g, "-").toLowerCase();
  const [op, setOp] = useState(0);
  const location = useLocation();

  const executeScroll = () => scrollToRef(linkRef);

  useEffect(() => {
    setTimeout(() => {
      if (location.hash == "#" + id) {
        executeScroll();
      }
    }, 500);
  }, [linkRef, location]);

  return (
    <React.Fragment key={nodeKey}>
      <Heading
        {...props}
        ref={linkRef}
        onMouseEnter={() => setOp(0.8)}
        onMouseLeave={() => setOp(0)}
      >
        {children}
        <a id={id} href={`#${id}`}>
          <div
            className={css["anchor-link"] + " " + css["anchor-h" + level]}
            style={{ opacity: op }}
          ></div>
        </a>
      </Heading>
    </React.Fragment>
  );
};

export default function Docs(props) {
  const { setImage } = props;

  const sectionMatch = useRouteMatch("/docs/:section");
  const resource = sectionMatch
    ? resources[sectionMatch.params.section]
    : resources.introduction;

  React.useEffect(() => {
    setImage(keyArt);
  }, []);

  return (
    <WrapperOuter style={{ minHeight: "calc(100vh - 5px)" }}>
      <div className={css["docs-wrapper-top"]}></div>
      <div className={css["docs-wrapper"]}>
        <div className={css["docs-sidebar"]}>
          <div className={css["docs-sidebar-content"]}>
            {docs.docs.map(title => {
              const path = docs[title].path;
              const isActive =
                sectionMatch && sectionMatch.params.section == path;

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
        </div>
        <div className={css["docs-main"]}>
          {resource ? (
            <ReactMarkdown
              transformImageUri={imageTransform}
              renderers={{ heading: HeadRenderer }}
              source={resource}
            ></ReactMarkdown>
          ) : (
            <></>
          )}
        </div>
      </div>
    </WrapperOuter>
  );
}
