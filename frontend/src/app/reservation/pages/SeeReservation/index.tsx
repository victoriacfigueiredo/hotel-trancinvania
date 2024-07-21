import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Text, Button, HStack, VStack, Icon, Divider } from '@chakra-ui/react';
import { FaBed, FaChild, FaUser, FaCalendarAlt, FaEdit, FaTrashAlt, FaWifi, FaConciergeBell, FaCoffee, FaSnowflake, FaCar, FaCreditCard, FaDollarSign } from 'react-icons/fa';
import { NavBar } from '../../../../shared/components/nav-bar';
import { getReservationById, cancelReservation } from '../../services';
import { getPublishedReservationById } from '../../../PublishedReservation/services';
import { ReserveModel } from '../../models/reserve';
import { PublishedReservationModel } from '../../../PublishedReservation/models/publishedReservation';
import { FaPerson } from 'react-icons/fa6';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SeeReservation: React.FC = () => {
  const { reserve_id } = useParams<{ reserve_id: string }>();
  const [reservation, setReservation] = useState<ReserveModel>({} as ReserveModel);
  const [publishedReservation, setPublishedReservation] = useState<PublishedReservationModel>({} as PublishedReservationModel);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservation = async () => {
      if (!reserve_id) return; // Verifique se reservationId está definido
      try {
        const reservationResponse = await getReservationById(+reserve_id) ?? '';
        setReservation(reservationResponse);

        if (reservationResponse && reservationResponse.publishedReservationId) {
          const publishedReservationResponse = await getPublishedReservationById(reservationResponse.publishedReservationId);
          setPublishedReservation(publishedReservationResponse);
        }
      } catch (error) {
        console.error('Erro ao obter a reserva:', error);
      }
    };

    fetchReservation();
  }, [reserve_id]);

  if (!reservation || !publishedReservation) {
    return <Box>Carregando...</Box>;
  }

  const handleEdit = () => {
    navigate(`/edit-reservation/${reserve_id}`);
  };

  const handleCancel = async () => {
    if (!reserve_id) return;

    const confirmCancel = window.confirm("Tem certeza que deseja cancelar esta reserva?");
    if (confirmCancel) {
      try {
        await cancelReservation(+reserve_id) ?? '';
        toast.success("Reserva cancelada com sucesso!", {
          autoClose: 3000, // 3000ms = 3 seconds
          onClose: () => {
            navigate(`/my-reservations`);
          },
        });
      } catch (error) {
        toast.error("Erro ao cancelar a reserva. Tente novamente.");
      }
    }
  };
  const isFutureReservation = new Date(reservation.checkin) > new Date();

  return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column">
      <NavBar />
      <Box
        flex="1"
        bg="#191919"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        {/* Bloco roxo com sombra */}
        <Box position="absolute" left="200px" top="100px" width="500px">
          <Box
            position="relative"
            width="100%"
            height="300px"
            bg="#6A0572"
            zIndex="1"
            backgroundSize="cover"
            backgroundPosition="center"
            style={{ backgroundImage: `url(http://localhost:5001${publishedReservation.imageUrl})` }}
          />
          <Box
            position="absolute"
            width="100%"
            height="300px"
            bg="rgba(255, 255, 255, 0.1)"
            top="10px"
            left="10px"
            zIndex="0"
          />
          <Text
            mt="20px"
            color="#EAEAEA"
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
          >
            {publishedReservation.name}
          </Text>
          <Text color="#EAEAEA" fontSize="xl" textAlign="center" display="flex" alignItems="center" justifyContent="center">
            R$ {publishedReservation.new_price}.00 a diária
            <Divider orientation="vertical" borderColor="#EAEAEA" height="20px" mx={2} />
            <Icon as={FaPerson} color="#EAEAEA" />
            {publishedReservation.people} hóspedes
          </Text>

          <HStack mt="10px" justify="center" spacing={4}>
            {publishedReservation.wifi && <ServicesComponent value="Wi-Fi" icon={FaWifi} />}
            {publishedReservation.room_service && <ServicesComponent value="Serviço de Quarto" icon={FaConciergeBell} />}
            {publishedReservation.breakfast && <ServicesComponent value="Café da Manhã" icon={FaCoffee} />}
            {publishedReservation.airConditioner && <ServicesComponent value="Ar-condicionado" icon={FaSnowflake} />}
            {publishedReservation.parking && <ServicesComponent value="Estacionamento" icon={FaCar} />}
          </HStack>
        </Box>
        <Box
          position="relative"
          width="400px"
          height="auto"
          border="2px solid #EAEAEA"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          left="300px" // Ajuste a posição para a esquerda
          py="20px"
          top="0"
        >
          <Text
            position="absolute"
            top="-23px"
            bg="#191919"
            px="10px"
            color="#EAEAEA"
            fontFamily='Trancinfont'
            fontSize="30px"
          >
            Dados da reserva 
          </Text>
          <VStack spacing={4} mt="20px">
            <HStack>
              <Icon as={FaCalendarAlt} color="#EAEAEA" />
              <Text color="#EAEAEA">Check-in: {reservation.checkin}</Text>
            </HStack>
            <HStack>
              <Icon as={FaCalendarAlt} color="#EAEAEA" />
              <Text color="#EAEAEA">Check-out: {reservation.checkout}</Text>
            </HStack>
            <HStack>
              <Icon as={FaBed} color="#EAEAEA" />
              <Text color="#EAEAEA">Quartos: {reservation.num_rooms}</Text>
            </HStack>
            <HStack>
              <Icon as={FaUser} color="#EAEAEA" />
              <Text color="#EAEAEA">Adultos: {reservation.num_adults}</Text>
            </HStack>
            <HStack>
              <Icon as={FaChild} color="#EAEAEA" />
              <Text color="#EAEAEA">Crianças: {reservation.num_children}</Text>
            </HStack>
            <HStack>
              <Icon as={FaCreditCard} color="#EAEAEA" />
              <Text color="#EAEAEA">Método de Pagamento: {reservation.paymentMethodName}</Text>
            </HStack>
            <HStack>
              <Icon as={FaDollarSign} color="#EAEAEA" />
              <Text color="#EAEAEA">Valor Total: R$ {reservation.price}.00</Text>
            </HStack>
            {isFutureReservation && (
              <HStack spacing={4} mt="20px">
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  borderColor="#EAEAEA"
                  color="#EAEAEA"
                  _hover={{ bg: '#EAEAEA', color: '#191919' }}
                  leftIcon={<FaEdit />}
                  height = "50px"
                  width="150px"
                >
                  Editar
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  borderColor="#EAEAEA"
                  color="#EAEAEA"
                  _hover={{ bg: 'red.500', color: '#EAEAEA' }}
                  leftIcon={<FaTrashAlt />}
                  height = "50px"
                  width="150px"
                >
                  Cancelar
                </Button>
              </HStack>
            )}
          </VStack>
        </Box>
      </Box>
      <ToastContainer theme="dark"/>
    </Box>
  );
};

const ServicesComponent = ({ icon, value }) => {
  return (
    <HStack spacing={1}>
      <Icon as={icon} color="#EAEAEA" />
      <Text color="#EAEAEA" fontSize="sm" whiteSpace="nowrap">
        {value}
      </Text>
    </HStack>
  );
};

export default SeeReservation;