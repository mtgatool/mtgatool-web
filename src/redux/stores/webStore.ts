import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import webSlice from "../slices/webSlice";
import hoverSlice from "../slices/hoverSlice";

const rootReducer = combineReducers({
  web: webSlice.reducer,
  hover: hoverSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [],
});

export default store;
export type AppState = ReturnType<typeof rootReducer>;
