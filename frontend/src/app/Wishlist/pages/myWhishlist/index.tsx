import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  Button,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Fonts } from "../../../../shared/theme/Fonts";
import { DeleteIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Global } from "@emotion/react";
import { NavBar } from "../../../../shared/components/nav-bar";
import { ToastContainer, toast } from 'react-toastify';
import { getSavedReservationByClientId, deleteSavedReservationById } from "../../services";
import { useClientData } from "../../../auth/hooks/useUserData";


export const Whishlist = () => {
  /*const { data } = useClientData();
  const clientId = Number(data?.id);

  */const clientId = 4;

  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!clientId) {
        toast.error('ID do cliente não encontrado.');
        return;
      }
      
      try {
        const Reservationdata = await getSavedReservationByClientId(clientId);
        setReservations(Reservationdata);
      } catch (error) {
        console.error('Erro ao obter as reservas salvas:', error);
        toast.error('Erro ao obter as reservas salvas.');
      }
    };

    fetchReservations();
  }, [clientId]);

  const handleDelete = async (reservationId: number) => {
    if (!clientId) {
      toast.error('ID do cliente não encontrado.');
      return;
    }

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
        <Box display="flex" justifyContent="center" mt={4} position="relative">
          <Heading as="h1" size="lg" textAlign="center" color="#EAEAEA" mb={4} fontFamily="Trancinfont">
            Lista de Desejos
          </Heading>
        </Box>

        {/* Conteúdo principal */}
        <Box display="flex" justifyContent="center" alignItems="center" mt={8}>
          {reservations.length === 0 ? (
            <Text color="#EAEAEA" textAlign="center">Nenhuma reserva salva encontrada.</Text>
          ) : (
            <Wrap spacing="30px" justify="center">
              {reservations.map(reservation => (
                <WrapItem key={reservation.id}>
                  <Box border="none" borderRadius="8px" overflow="hidden" bg="#282828" width="300px">
                    <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                      <Image src={reservation.image || "https://via.placeholder.com/300"} alt={`Hotel ${reservation.id}`} width="100%" height="100%" objectFit="cover" />
                    </Box>
                    <Box p={4}>
                      <Text fontSize="lg" mb={4} textAlign="left">{reservation.name || `Hotel ${reservation.id}`}</Text>
                      <Flex justifyContent="center" gap={4}>
                        <Button
                          variant="ghost" // Removido o contorno
                          color="#EAEAEA"
                          _hover={{ bg: "#5e3a72" }}
                          onClick={() => handleDelete(reservation.id)}
                          aria-label="Delete"
                        >
                          <DeleteIcon boxSize="20px" />
                        </Button>
                        <Button
                          variant="ghost" // Removido o contorno
                          color="#EAEAEA"
                          _hover={{ bg: "#5e3a72" }}
                          onClick={() => {/* Função para seta para a esquerda */}}
                          aria-label="Back"
                        >
                          <ArrowForwardIcon boxSize="20px" />
                        </Button>
                      </Flex>
                    </Box>
                  </Box>
                </WrapItem>
              ))}
            </Wrap>
          )}
        </Box>
        <ToastContainer position="top-right" theme="dark" autoClose={3000} />
      </Box>
    </>
  );
};

export default Whishlist;
