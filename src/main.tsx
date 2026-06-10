import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./hooks/useTheme";
import App from "./App";
import "./styles/globals.css";
import "./components/IntroLoader/IntroLoader.css";
import "./components/SectionLoader/SectionLoader.css";
import "./components/ProjectWheel/ProjectWheel.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
