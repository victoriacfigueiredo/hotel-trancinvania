import React from 'react';
import { Box, Text } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { NavBar } from "../../../../shared/components/nav-bar";

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

        <Box position="absolute" top="15%" left="50%" transform="translate(-50%, -50%)">
          <Text fontSize="25px" fontFamily="Inter" fontWeight="200" mb={3} textAlign="center" color="#EAEAEA">
            Minhas Reservas
          </Text>
        </Box>
          
        <Box position="absolute" top="30%" left="50%" transform="translate(-50%, -50%)" display="flex" justifyContent="center" gap="20px">
          {reservas.map((reserva, index) => (
            <Box key={index} bg="white" color="black" borderRadius="md" overflow="hidden" width="300px" textAlign="center">
              <Text fontSize="20px" fontWeight="bold" mt={2}>Quarto Mar</Text>
              <Text fontSize="16px" color={reserva.statusColor}>{reserva.status}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};
