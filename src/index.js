import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import PositionProvider from "./components/PositionContext";
import ConditionProvider from "./components/ConditionContext";
import UserProvider from "./components/ChipContext";
import ChipProvider from "./components/ChipContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChipProvider>
      <PositionProvider>
        <ConditionProvider>
          <App />
        </ConditionProvider>
      </PositionProvider>
    </ChipProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
