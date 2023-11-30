import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {RouterProvider} from "react-router-dom";

import router from "./router.jsx";
import store from "./store.js";


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);