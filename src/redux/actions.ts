import * as WebSlice from "./slices/webSlice";
import * as HoverSlice from "./slices/hoverSlice";

export const actions = {
  SET_HOVER_IN: HoverSlice.setHoverIn,
  SET_HOVER_OUT: HoverSlice.setHoverOut,
  SET_LOADING: WebSlice.setLoading,
  SET_DB_VERSION: WebSlice.setDbVersion,
  SET_VERSION_TAG: WebSlice.setVersionTag,
  SET_SCROLL: WebSlice.setScroll
};

export type ActionKeys = keyof typeof actions;
