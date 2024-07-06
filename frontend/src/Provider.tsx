import { ReactNode } from "react";
import { HomeProvider } from "./app/example/context/HomeContext";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./shared/theme/theme";
import { Fonts } from "./shared/theme/Fonts";
import GlobalStyles from "./shared/theme/GlobalStyles";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ChakraProvider theme={theme}>
      <GlobalStyles />
      <Fonts />
      <HomeProvider>{children}</HomeProvider>
    </ChakraProvider>
  );
};

export default Provider;
