import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import App from "./App";

const theme = extendTheme({
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
});

const container = document.getElementById('root');
const root = createRoot(container!); 
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
