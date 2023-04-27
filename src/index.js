import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import "./firebase";

import {store} from "./redux/store";
import "./index.scss";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename='Movies_OMDb_API_React'>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
