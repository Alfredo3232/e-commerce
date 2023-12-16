import React from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { HelmetProvider } from "react-helmet-async";

import router from "./router.jsx";
import store from "./store.js";


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HelmetProvider>
            <Provider store={store}>
                <PayPalScriptProvider deferLoading={true}>
                    <RouterProvider router={router} />
                </PayPalScriptProvider>
            </Provider>
        </HelmetProvider>
    </React.StrictMode>
);