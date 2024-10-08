import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./i18n"; // Ensure this import is present to initialize i18n
import { GoogleOAuthProvider } from "@react-oauth/google";

const rootElement = document.getElementById("root");
let root;
if (rootElement) {
  root = ReactDOM.createRoot(rootElement);
}

// import { createRoot } from "react-dom/client";
// const container = document.getElementById("app");
// const root = createRoot(container);
root?.render(
  <Provider store={store}>
    <React.StrictMode>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID || ""}>
        <App />
      </GoogleOAuthProvider>
    </React.StrictMode>
  </Provider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({});
