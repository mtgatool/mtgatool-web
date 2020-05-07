/* eslint-disable react/prop-types */
import React from "react";

export interface AppState {
  scroll: number,
  queryState: number,
  HoverGrpId: number,
  HoverOpacity: number,
  databaseVersion: number,
  versionTag: string
};

const defaultWebState: AppState = {
  scroll: window.scrollY,
  queryState: 0,
  HoverGrpId: 1,
  HoverOpacity: 0,
  databaseVersion: 0,
  versionTag: "v3.0.4"
};

const WebStateContext = React.createContext({});
const WebDispatchContext = React.createContext({});

function webReducer(state: AppState, action: any): AppState {
  switch (action.type) {
    case "setScroll": {
      return { ...state, scroll: action.scroll };
    }
    case "setHoverCard": {
      return { ...state, HoverGrpId: action.HoverGrpId };
    }
    case "setQueryState": {
      return { ...state, queryState: action.queryState };
    }
    case "setHoverOpacity": {
      return { ...state, HoverOpacity: action.HoverOpacity };
    }
    case "setDatabaseVersion": {
      return { ...state, databaseVersion: action.databaseVersion };
    }
    case "setVersionTag": {
      return { ...state, versionTag: action.versionTag };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function WebProvider({ children }: {children: any;}): JSX.Element {
  const [state, dispatch] = React.useReducer(webReducer, defaultWebState);
  return (
    <WebStateContext.Provider value={state}>
      <WebDispatchContext.Provider value={dispatch}>
        {children}
      </WebDispatchContext.Provider>
    </WebStateContext.Provider>
  );
}

const useWebContext = (): any => {
  const context = React.useContext(WebStateContext);
  if (!context) {
    throw new Error(
      "useWebContext must be used in a component within a WebProvider."
    );
  }
  return context;
};

function useWebDispatch(): any {
  const context = React.useContext(WebDispatchContext);
  if (context === undefined) {
    throw new Error("useWebDispatch must be used within a WebProvider");
  }
  return context;
}

export { WebProvider, useWebContext, useWebDispatch };
