import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "../src/styles/index.css";
import { QuizProvider } from "./contexts/QuizContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>
);
