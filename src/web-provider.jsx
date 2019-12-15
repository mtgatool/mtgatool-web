import React from "react";

const WebStateContext = React.createContext();
const WebDispatchContext = React.createContext();

function webReducer(state, action) {
  switch (action.type) {
    case "setHoverCard": {
      return { ...state, HoverGrpId: action.HoverGrpId };
    }
    case "setHoverOpacity": {
      return { ...state, HoverOpacity: action.HoverOpacity };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const defaultWebState = {
  HoverGrpId: 1,
  HoverOpacity: 0
};

function WebProvider({ children }) {
  const [state, dispatch] = React.useReducer(webReducer, defaultWebState);
  return (
    <WebStateContext.Provider value={state}>
      <WebDispatchContext.Provider value={dispatch}>
        {children}
      </WebDispatchContext.Provider>
    </WebStateContext.Provider>
  );
}

const useWebContext = () => {
  const context = React.useContext(WebStateContext);
  if (!context) {
    throw new Error(
      "useWebContext must be used in a component within a WebProvider."
    );
  }
  return context;
};

function useWebDispatch() {
  const context = React.useContext(WebDispatchContext);
  if (context === undefined) {
    throw new Error("useWebDispatch must be used within a WebProvider");
  }
  return context;
}

export { WebProvider, useWebContext, useWebDispatch };
