import ReactDOM from "react-dom";
import React from "react";
import App from "./App";

import "./service/firebase";

import "./styles/global.scss";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);
