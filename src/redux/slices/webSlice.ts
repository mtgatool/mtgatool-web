import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { STATE_IDLE } from "../../constants";
import keyArt from "../../assets/images/key-art-new.jpg";
import { DbCardData } from "mtgatool-shared";

const initialWebState = {
  loadingState: STATE_IDLE,
  scroll: window.scrollY,
  databaseVersion: 0,
  versionTag: "6.0.10",
  backImage: keyArt as DbCardData | string,
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
    },
    setBackImage: (
      state: Web,
      action: PayloadAction<DbCardData | string>
    ): void => {
      state.backImage = action.payload;
    },
  },
});

export const {
  setLoading,
  setDbVersion,
  setVersionTag,
  setScroll,
  setBackImage,
} = webSlice.actions;

export default webSlice;
