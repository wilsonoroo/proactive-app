import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthProvider from "./contexts/AuthContext";
import "./index.scss";

import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0080FF",
    },
    secondary: {
      main: "#f50057",
    },
  },
  shape: {
    borderRadius: 15,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
