import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATE_IDLE } from "../../constants";

const initialWebState = {
  loadingState: STATE_IDLE,
  scroll: window.scrollY,
  databaseVersion: 0,
  versionTag: "v5.4.0"
};

type Web = typeof initialWebState;

const webSlice = createSlice({
  name: "web",
  initialState: initialWebState,
  reducers: {
    setLoading: (state: Web, action: PayloadAction<number>): void => {
      state.loadingState = action.payload;
    },
    setDbVersion: (state: Web, action: PayloadAction<number>): void => {
      state.databaseVersion = action.payload;
    },
    setVersionTag: (state: Web, action: PayloadAction<string>): void => {
      state.versionTag = action.payload;
    },
    setScroll: (state: Web, action: PayloadAction<number>): void => {
      state.scroll = action.payload;
    }
  }
});

export const {
  setLoading,
  setDbVersion,
  setVersionTag,
  setScroll
} = webSlice.actions;

export default webSlice;
