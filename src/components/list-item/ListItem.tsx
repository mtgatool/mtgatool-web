import React, { PropsWithChildren } from "react";
import { getCardArtCrop } from "../../shared/utils/getCardArtCrop";

import css from "./ListItem.css";

interface ListItemProps extends JSX.ElementChildrenAttribute {
  click: VoidFunction;
}

export function ListItem(props: PropsWithChildren<ListItemProps>): JSX.Element {
  const { click } = props;
  return (
    <div onClick={click} className={css.listItemContainer}>
      {props.children}
    </div>
  );
}

interface HoverTileProps {
  grpId: number;
}

export function HoverTile(
  props: PropsWithChildren<HoverTileProps>
): JSX.Element {
  const { grpId } = props;

  return (
    <div
      className={css.listItemImage}
      style={{ backgroundImage: `url(${getCardArtCrop(grpId)})` }}
    >
      {props.children}
    </div>
  );
}

interface ColumnProps extends JSX.ElementChildrenAttribute {
  style?: React.CSSProperties;
  class?: string;
}

export function Column(props: PropsWithChildren<ColumnProps>): JSX.Element {
  const style = props.style || {};
  return (
    <div
      style={{ ...style, flexDirection: "column" }}
      className={props.class || ""}
    >
      {props.children}
    </div>
  );
}

interface FlexProps extends JSX.ElementChildrenAttribute {
  title?: string;
  style?: React.CSSProperties;
  innerClass?: string;
}

export function FlexTop(props: PropsWithChildren<FlexProps>): JSX.Element {
  const style = props.style || {};
  return (
    <div
      style={{ height: "50%", display: "flex", lineHeight: "32px", ...style }}
    >
      {props.innerClass ? (
        <div title={props.title} className={props.innerClass}>
          {props.children}
        </div>
      ) : (
        props.children
      )}
    </div>
  );
}

export const FlexBottom = FlexTop;
