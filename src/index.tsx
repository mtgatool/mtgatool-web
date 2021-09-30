import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/stores/webStore";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

if ((module as any).hot && process.env.NODE_ENV === "development") {
  (module as any).hot.accept();
  // eslint-disable-next-line global-require
  const NextApp = require("./App").default;
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <NextApp />
        </Router>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
