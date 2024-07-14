import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./shared/theme/theme";
import { Fonts } from "./shared/theme/Fonts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Fonts />
        {children}
      </ChakraProvider>
    </QueryClientProvider>
};

export default Provider;
