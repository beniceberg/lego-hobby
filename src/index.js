import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import reducer from "./_reducer";
// import history from "./_utils";

const composeEnhancers = composeWithDevTools({});
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

render(
  <Provider store={store}>
    <BrowserRouter >
    {/* <Router history={history}> */}
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
