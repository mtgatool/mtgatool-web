import { PropsWithChildren } from "react";
import { getCardArtCrop } from "../../shared/utils/getCardArtCrop";
import { VoidFunction } from "../../web-types/shared";

import "./ListItem.css";

interface ListItemProps extends JSX.ElementChildrenAttribute {
  click: VoidFunction;
}

export function ListItem(props: PropsWithChildren<ListItemProps>): JSX.Element {
  const { click, children } = props;
  return (
    <div onClick={click} className="list-item-container">
      {children}
    </div>
  );
}

interface HoverTileProps {
  grpId: number;
}

export function HoverTile(
  props: PropsWithChildren<HoverTileProps>
): JSX.Element {
  const { grpId, children } = props;

  return (
    <div
      className="list-item-image"
      style={{ backgroundImage: `url(${getCardArtCrop(grpId)})` }}
    >
      {children}
    </div>
  );
}

interface ColumnProps extends JSX.ElementChildrenAttribute {
  style?: React.CSSProperties;
  className?: string;
}

export function Column(props: PropsWithChildren<ColumnProps>): JSX.Element {
  const { style, className, children } = props;
  return (
    <div style={{ ...style, flexDirection: "column" }} className={className}>
      {children}
    </div>
  );
}

interface FlexProps extends JSX.ElementChildrenAttribute {
  title?: string;
  style?: React.CSSProperties;
  innerClass?: string;
}

export function FlexTop(props: PropsWithChildren<FlexProps>): JSX.Element {
  const { style, innerClass, title, children } = props;

  return (
    <div
      style={{ height: "50%", display: "flex", lineHeight: "32px", ...style }}
    >
      {innerClass ? (
        <div title={title} className={innerClass}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export const FlexBottom = FlexTop;
