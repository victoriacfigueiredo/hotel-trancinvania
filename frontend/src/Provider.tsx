import { ReactNode } from "react";
import { HomeProvider } from "./app/home/context/HomeContext";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./shared/theme/theme";
import { Fonts } from "./shared/theme/Fonts";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ChakraProvider theme={theme}>
        <Fonts/>
        <HomeProvider>{children}</HomeProvider>
    </ChakraProvider>
  )  
};

export default Provider;
