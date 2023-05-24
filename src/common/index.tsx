import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import App from "../pages";
import React from "react";
import theme from 'src/utils/theme';
import "./index.css"

function render() {
  const root = createRoot(document.getElementById("app")); // createRoot(container!) if you use TypeScript
  root.render(
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  );
}

render();
