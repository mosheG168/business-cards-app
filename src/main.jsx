import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import App from "./App.jsx";
import "./index.css";

import { UserProvider } from "./components/context/UserContext";
import { ThemeModeProvider, useThemeMode } from "./components/context/ThemeContext";
import { SnackbarProvider } from "./components/context/SnackbarContext";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";

const ThemedApp = () => {
  const { mode } = useThemeMode();
  const theme = mode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename="/business-cards-app"> 
        <SnackbarProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeModeProvider>
    <ThemedApp />
  </ThemeModeProvider>
);
