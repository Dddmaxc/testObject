// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter, useRoutes } from "react-router-dom";
import { publicRoutes } from "./routes/router";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "bootstrap/dist/css/bootstrap.min.css";


const AppRouter = () => useRoutes(publicRoutes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
