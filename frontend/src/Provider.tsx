import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./shared/theme/theme";
import { Fonts } from "./shared/theme/Fonts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReservationProvider } from "../src/app/reservation/context"

const queryClient = new QueryClient();

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Fonts />
        <ReservationProvider>
        {children}
        </ReservationProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default Provider;
