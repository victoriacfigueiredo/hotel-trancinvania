import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  Button,
  Text,
} from "@chakra-ui/react";
import { Fonts } from "../../../../shared/theme/Fonts";
import { DeleteIcon } from "@chakra-ui/icons";
import { Global } from "@emotion/react";
import { NavBar } from "../../../../shared/components/nav-bar";
import { ToastContainer, toast } from 'react-toastify';
import { getSavedReservationByClientId, deleteSavedReservationById } from "../../services";

export const Whishlist = () => {
  const clientId = 1; // Substitua pelo ID real do cliente
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getSavedReservationByClientId(clientId);
        setReservations(data);
      } catch (error) {
        console.error('Erro ao obter as reservas salvas:', error);
        toast.error('Erro ao obter as reservas salvas.');
      }
    };

    fetchReservations();
  }, []);

  const handleDelete = async (reservationId: number) => {
    try {
      await deleteSavedReservationById(clientId, reservationId);
      setReservations(prev => prev.filter(reservation => reservation.id !== reservationId));
      toast.success('Reserva apagada com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar a reserva:', error);
      toast.error('Erro ao deletar a reserva.');
    }
  };

  return (
    <>
      <Fonts />
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

        {/* Adicionando o título */}
        <Box display="flex" justifyContent="center" mt={4}  position="relative">
          <Heading as="h1" size="lg"  textAlign="center" color="#EAEAEA" mb={4} fontFamily="Trancinfont">
            Lista de Desejos
          </Heading>
        </Box>

        {/* Conteúdo principal */}
        <Box display="flex" justifyContent="center" alignItems="center" mt={8}>
          <Flex direction="row" justifyContent="space-around" width="80%">
            {reservations.length === 0 ? (
              <Text color="#EAEAEA" textAlign="center">Nenhuma reserva salva encontrada.</Text>
            ) : (
              reservations.map(reservation => (
                <Box key={reservation.id} border="1px solid #EAEAEA" borderRadius="8px" overflow="hidden" bg="#282828" width="250px">
                  <Box display="flex" justifyContent="center" alignItems="center" height="150px">
                    <Image src={reservation.image || "https://via.placeholder.com/150"} alt={`Hotel ${reservation.id}`} />
                  </Box>
                  <Box p={4}>
                    <Text fontSize="lg" mb={4} textAlign="center">{reservation.name || `Hotel ${reservation.id}`}</Text>
                    <Flex justifyContent="space-between">
                      <Button bg="#784A95" color="#EAEAEA" _hover={{ bg: "#5e3a72" }} onClick={() => handleDelete(reservation.id)}>
                        <DeleteIcon boxSize="20px" />
                      </Button>
                      <Button bg="#784A95" color="#EAEAEA" _hover={{ bg: "#5e3a72" }}>Ir</Button>
                    </Flex>
                  </Box>
                </Box>
              ))
            )}
          </Flex>
        </Box>
        <ToastContainer position="top-right" theme="dark" autoClose={3000} />
      </Box>
    </>
  );
};

export default Whishlist;
