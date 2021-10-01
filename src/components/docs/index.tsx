/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect, Fragment, createElement } from "react";
import { useRouteMatch, useLocation, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import { WrapperOuter } from "../wrapper";
import "./docs.css";

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
import deckArchive from "../../assets/images/docs/deck-archive.png";
import deckView from "../../assets/images/docs/deck-view.png";
import detailedLogsImg from "../../assets/images/docs/detailed-logs.png";
import filterBoosters from "../../assets/images/docs/collection-filter-boosters.png";
import viewSets from "../../assets/images/docs/collection-view-sets.png";

import { reduxAction } from "../../redux/webRedux";

const resources = {
  introduction: introduction,
  installation: installation,
  "output-logs": outputLogs,
  privacy: privacy,
  decks: decks,
  collection: collection,
  overlays: overlays,
};

const scrollToRef = (ref: any): void =>
  window.scrollTo(0, ref.current.offsetTop);

const imageTransform = (img: string): string => {
  switch (img) {
    case "deck-archive":
      return deckArchive;
    case "deck-view":
      return deckView;
    case "detailed-logs":
      return detailedLogsImg;
    case "collection-filter-boosters":
      return filterBoosters;
    case "collection-view-sets":
      return viewSets;
    default:
      return img;
  }
};

function Heading({ children, ...props }: any): JSX.Element {
  const { level } = props;
  return createElement(`h${level}`, props, children);
}

const HeadRenderer = (props: any): JSX.Element => {
  const { nodeKey, children, level } = props;
  const linkRef = useRef(null);
  const id = children[0].props.value.replace(/\s+/g, "-").toLowerCase();
  const [op, setOp] = useState(0);
  const location = useLocation();

  const executeScroll = (): void => scrollToRef(linkRef);

  useEffect(() => {
    setTimeout(() => {
      if (location.hash === `#${id}`) {
        executeScroll();
      }
    }, 500);
  }, [id, linkRef, location]);

  return (
    <Fragment key={nodeKey}>
      <Heading
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        ref={linkRef}
        onMouseEnter={(): void => setOp(0.8)}
        onMouseLeave={(): void => setOp(0)}
      >
        {children}
        <a id={id} href={`#${id}`}>
          <div
            className={`anchor-link anchor-h ${level}`}
            style={{ opacity: op }}
          />
        </a>
      </Heading>
    </Fragment>
  );
};

export default function Docs(): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    reduxAction(dispatch, { type: "SET_BACK_IMAGE", arg: "" });
  }, [dispatch]);
  const sectionMatch = useRouteMatch<{ section: string }>("/docs/:section");
  const resource = sectionMatch
    ? (resources as any)[sectionMatch.params.section]
    : resources.introduction;

  return (
    <WrapperOuter style={{ minHeight: "calc(100vh - 5px)" }}>
      <div className="docs-wrapper-top" />
      <div className="docs-wrapper">
        <div className="docs-sidebar">
          <div className="docs-sidebar-content">
            {docs.docs.map((title: any) => {
              const { path } = docs[title];
              const isActive =
                sectionMatch && sectionMatch.params.section === path;

              if (docs[title].type === "section") {
                return (
                  <div
                    className={`docs-section-link${
                      isActive ? " docs-section-link-active" : ""
                    }`}
                    key={`${title}-side`}
                  >
                    <Link to={`/docs/${path}`}>{title}</Link>
                  </div>
                );
              }
              if (docs[title].type === "title") {
                return (
                  <div
                    className="docs-section-title"
                    key={`${title}-side-title`}
                  >
                    {title}
                  </div>
                );
              }
              return <></>;
            })}
          </div>
        </div>
        <div className="docs-main">
          {resource ? (
            <ReactMarkdown
              transformImageUri={imageTransform}
              renderers={{ heading: HeadRenderer }}
              source={resource}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </WrapperOuter>
  );
}
