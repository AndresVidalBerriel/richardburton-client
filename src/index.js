import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "components/App";

import { store } from "store";

import "antd/dist/antd.less";
import "main.less";
import "translate";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,

    document.getElementById("mount")
);
