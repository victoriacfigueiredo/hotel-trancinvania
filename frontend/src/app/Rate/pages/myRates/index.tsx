import React from 'react';
import { Box, Text } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { NavBar } from "../../../../shared/components/nav-bar";
import { Fonts } from "../../../../shared/theme/Fonts";

const reservas = [
  { status: "Reserva Concluída", statusColor: "red",},
  { status: "Reserva em Andamento", statusColor: "yellow"},
  { status: "Reserva Futura", statusColor: "blue" }
];

export const Rate: React.FC = () => {
  return (
    <>
      <Global
        styles={`
          body {
            overflow: hidden;
          }
        `}
      />
      <Box
        bg="#191919"
        color="#EAEAEA"
        minH="100vh"
        fontFamily="Inter"
        position="relative"
      >
        <NavBar />

        <Box display="flex" justifyContent="center" mt={4} position="relative">
        </Box>

        <Box position="absolute" top="20%" left="50%" transform="translate(-50%, -50%)">
          <Text fontSize="25px" fontFamily="Trancinfont" fontWeight="200" mb={3} textAlign="center" color="#EAEAEA">
            Minhas Avaliações
          </Text>
        </Box>
      </Box>
    </>
  );
};
