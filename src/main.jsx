import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
// import "./index.css";
import "@mantine/core/styles.css";

import { MantineProvider, Button } from "@mantine/core";
// import { ColorSchemeProvider } from "@mantine/hooks";
import { myTheme } from "./theme";

function Main() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      defaultColorScheme="dark"
    >
      <HashRouter>
        <App />
      </HashRouter>
    </MantineProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
