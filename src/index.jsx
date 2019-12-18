import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { WebProvider } from "./web-provider";

ReactDOM.render(
  <WebProvider>
    <App />
  </WebProvider>,
  document.getElementById("app")
);
