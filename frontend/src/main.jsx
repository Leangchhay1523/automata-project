import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FaProvider } from "./context/FaContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FaProvider>
      <App />
    </FaProvider>
  </StrictMode>
);
