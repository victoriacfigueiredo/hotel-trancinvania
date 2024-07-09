import { ReactNode } from "react";
import { HomeProvider } from "./app/home/context/HomeContext";
import { ChakraProvider } from "@chakra-ui/react";

const Provider = ({ children }: { children: ReactNode }) => {
  return <ChakraProvider> 
  <HomeProvider>{children}</HomeProvider>
  </ChakraProvider>
};

export default Provider;
