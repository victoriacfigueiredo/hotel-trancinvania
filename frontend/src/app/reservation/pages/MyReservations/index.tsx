import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../../../shared/components/nav-bar';
import { getPublishedReservationById } from '../../../PublishedReservation/services';
import { PublishedReservationModel } from '../../../PublishedReservation/models/publishedReservation';
import { getReservationsByClient } from '../../services';
import { ReserveModel } from '../../models/reserve';

const MyReservations: React.FC = () => {
  const [reservations, setReservations] = useState<ReserveModel[]>([]);
  const [publishedReservations, setPublishedReservations] = useState<{ [key: number]: PublishedReservationModel }>({});
  const clientId = 1;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await getReservationsByClient(clientId);
        setReservations(response);

        const publishedReservationsData: { [key: number]: PublishedReservationModel } = {};
        for (const reservation of response) {
          const publishedReservation = await getPublishedReservationById(reservation.publishedReservationId);
          publishedReservationsData[reservation.publishedReservationId] = publishedReservation;
        }
        setPublishedReservations(publishedReservationsData);
      } catch (error) {
        console.error('Erro ao obter as reservas:', error);
      }
    };

    fetchReservations();
  }, [clientId]);

  const getStatus = (checkin: string, checkout: string) => {
    const currentDate = new Date();
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);

    if (currentDate > checkoutDate) {
      return 'Reserva Concluída';
    } else if (currentDate >= checkinDate && currentDate <= checkoutDate) {
      return 'Reserva em Andamento';
    } else {
      return 'Reserva Futura';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Reserva Concluída':
        return '#FF0000'; // Vermelho
      case 'Reserva em Andamento':
        return '#FAC006'; // Amarelo
      case 'Reserva Futura':
        return '#0097b2'; // Verde
      default:
        return '#EAEAEA'; // Branco
    }
  };

  return (
    <Box bg="#191919" minH="100vh" display="flex" flexDirection="column">
      <NavBar />
      <Box p="50px" position="relative">
        <Box fontFamily="Trancinfont" mt="-25px" fontSize="50px" textAlign="center" color="#eaeaea">Minhas reservas</Box>
        <Flex flexWrap="wrap" gap="75px" mt="30px">
          {reservations.map((reservation) => {
            const publishedReservation = publishedReservations[reservation.publishedReservationId];
            if (!publishedReservation) {
              return null;
            }
            const status = getStatus(reservation.checkin, reservation.checkout);
            const statusColor = getStatusColor(status);
            return (
              <Box key={reservation.id} position="relative" w="250px" h="300px" _hover={{ transform: 'translateY(-5px)' }}>
                <Box position="relative" w="270px" h="300px" bg="transparent" borderRadius="10px" overflow="hidden" color="#191919" cursor="pointer" onClick={() => navigate(`/see-reservation/${reservation.id}`)}>
                  <Box w="100%" h="72%" backgroundSize="cover" backgroundPosition="center" borderBottomLeftRadius="10px" borderBottomRightRadius="10px" style={{ backgroundImage: `url(http://localhost:5001${publishedReservation.imageUrl})` }}></Box>
                  <Box fontSize="20px" color="#eaeaea" textAlign="start" fontWeight="bold">{publishedReservation.name}</Box>
                  <Box fontSize="14px" color={statusColor} textAlign="start">{status}</Box>
                </Box>
              </Box>
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
}

export default MyReservations;
























// import React from 'react';
// import { Box, Text, Button, HStack } from '@chakra-ui/react';
// import { NavBar } from '../../../../shared/components/nav-bar';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const MyReservations: React.FC = () => {
//   const handleCancel = () => {
//     toast.success('Reserva cancelada com sucesso!');
//   };
//   const editPage = async () => {
//     window.location.href = "http://localhost:3000/edit-reservation";
// };

//   return (
//     <Box width="100vw" height="100vh" display="flex" flexDirection="column">
//       <NavBar />
//       <Box
//         flex="1"
//         bg="#191919"
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         position="relative"
//         p="20px"
//       >
//         <Box
//           mt="5%"
//           width="90%"
//           height="94%"
//           border="2px solid #EAEAEA"
//           borderBottom="none"
//           display="flex"
//           flexDirection="column"
//           alignItems="flex-start"
//           justifyContent="flex-start"
//           position="relative"
//           pl="40px"
//           pt="40px"
//         >
//           <Text
//             fontSize="2xl"
//             color="#EAEAEA"
//             bg="#191919"
//             position="absolute"
//             top="-20px"
//             left="40px"
//             px="10px"
//           >
//             Minhas Reservas
//           </Text>
//           <Box
//             width="300px"
//             height="200px"
//             bg="#6A0572"
//             border="2px solid #EAEAEA"
//             position="relative"
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             justifyContent="center"
//             mt="20px"
//           />
//           <Box
//             width="300px"
//             bg="#EAEAEA"
//             color="#191919"
//             textAlign="center"
//             padding="5px 0"
//             fontWeight="bold"
//           >
//             Zumbi Digital
//           </Box>
//           <Box
//             width="300px"
//             bg="transparent"
//             border="2px solid #EAEAEA"
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             mt="0"
//             padding="10px"
//           >
//             <HStack spacing="10px">
//               <Button
//                 width="100px"
//                 bg="transparent"
//                 border="2px solid #EAEAEA"
//                 color="#EAEAEA"
//                 _hover={{ bg: '#EAEAEA', color: '#191919' }}
//                 onClick={editPage}
//               >
//                 Editar
//               </Button>
//               <Button
//                 width="100px"
//                 bg="transparent"
//                 border="2px solid #EAEAEA"
//                 color="#EAEAEA"
//                 _hover={{ bg: '#A4161A', color: '#EAEAEA' }}
//                 onClick={handleCancel}
//               >
//                 Cancelar
//               </Button>
//             </HStack>
//           </Box>
//         </Box>
//       </Box>
//       <ToastContainer theme='dark'/>
//     </Box>
//   );
// };

// export default MyReservations;
