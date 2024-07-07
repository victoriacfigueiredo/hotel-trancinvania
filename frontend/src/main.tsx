import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import Provider from "./Provider";
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
     <ChakraProvider>
        <Provider>
          <App />
        </Provider>
    </ChakraProvider>,
  </React.StrictMode>
);
