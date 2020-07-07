/* eslint-disable react/prop-types */
import React from "react";
import { STATE_IDLE } from "./shared/constants";

export interface WebState {
  scroll: number;
  queryState: number;
  HoverGrpId: number;
  HoverOpacity: number;
  databaseVersion: number;
  versionTag: string;
}

const defaultWebState: WebState = {
  scroll: window.scrollY,
  queryState: STATE_IDLE,
  HoverGrpId: 1,
  HoverOpacity: 0,
  databaseVersion: 0,
  versionTag: "v4.1.0"
};

interface ContextType {
  dispatch: React.Dispatch<Action>;
  state: WebState;
}

const WebStateContext = React.createContext<ContextType>({
  state: defaultWebState,
  dispatch: () => null
});

interface Action {
  scroll?: number;
  HoverGrpId?: number;
  queryState?: number;
  HoverOpacity?: number;
  databaseVersion?: number;
  versionTag?: string;
  type:
    | "setScroll"
    | "setHoverCard"
    | "setQueryState"
    | "setHoverOpacity"
    | "setDatabaseVersion"
    | "setVersionTag";
}

function webReducer(state: WebState, action: Action): WebState {
  switch (action.type) {
    case "setScroll": {
      return { ...state, scroll: action.scroll || state.scroll };
    }
    case "setHoverCard": {
      return { ...state, HoverGrpId: action.HoverGrpId || state.HoverGrpId };
    }
    case "setQueryState": {
      return { ...state, queryState: action.queryState || state.queryState };
    }
    case "setHoverOpacity": {
      return {
        ...state,
        HoverOpacity:
          action.HoverOpacity == undefined
            ? state.HoverOpacity
            : action.HoverOpacity
      };
    }
    case "setDatabaseVersion": {
      return {
        ...state,
        databaseVersion: action.databaseVersion || state.databaseVersion
      };
    }
    case "setVersionTag": {
      return { ...state, versionTag: action.versionTag || state.versionTag };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function WebProvider({ children }: { children: React.ReactNode }): JSX.Element {
  //const state = React.useContext<WebState>(WebStateContext);
  const [state, dispatch] = React.useReducer(webReducer, defaultWebState);
  return (
    <WebStateContext.Provider value={{ state, dispatch } as ContextType}>
      {children}
    </WebStateContext.Provider>
  );
}

const useWebContext = (): WebState => {
  const context = React.useContext(WebStateContext);
  if (!context) {
    throw new Error(
      "useWebContext must be used in a component within a WebProvider."
    );
  }
  return context.state;
};

function useWebDispatch(): React.Dispatch<Action> {
  const initialState = React.useContext(WebStateContext);
  if (!initialState) {
    throw new Error(
      "useWebDispatch must be used in a component within a WebProvider."
    );
  }

  return initialState.dispatch;
}

export { WebProvider, useWebContext, useWebDispatch };
