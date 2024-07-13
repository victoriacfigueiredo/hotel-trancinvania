import React from 'react';
import { Box, Text, Button, HStack } from '@chakra-ui/react';
import { NavBar } from '../../../shared/components/nav-bar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyReservations: React.FC = () => {
  const handleCancel = () => {
    toast.success('Reserva cancelada com sucesso!');
  };
  const editPage = async () => {
    window.location.href = "http://localhost:3000/edit-reservation";
};

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
        p="20px"
      >
        <Box
          mt="5%"
          width="90%"
          height="94%"
          border="2px solid #EAEAEA"
          borderBottom="none"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          position="relative"
          pl="40px"
          pt="40px"
        >
          <Text
            fontSize="2xl"
            color="#EAEAEA"
            bg="#191919"
            position="absolute"
            top="-20px"
            left="40px"
            px="10px"
          >
            Minhas Reservas
          </Text>
          <Box
            width="300px"
            height="200px"
            bg="#6A0572"
            border="2px solid #EAEAEA"
            position="relative"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            mt="20px"
          />
          <Box
            width="300px"
            bg="#EAEAEA"
            color="#191919"
            textAlign="center"
            padding="5px 0"
            fontWeight="bold"
          >
            Zumbi Digital
          </Box>
          <Box
            width="300px"
            bg="transparent"
            border="2px solid #EAEAEA"
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt="0"
            padding="10px"
          >
            <HStack spacing="10px">
              <Button
                width="100px"
                bg="transparent"
                border="2px solid #EAEAEA"
                color="#EAEAEA"
                _hover={{ bg: '#EAEAEA', color: '#191919' }}
                onClick={editPage}
              >
                Editar
              </Button>
              <Button
                width="100px"
                bg="transparent"
                border="2px solid #EAEAEA"
                color="#EAEAEA"
                _hover={{ bg: '#A4161A', color: '#EAEAEA' }}
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            </HStack>
          </Box>
        </Box>
      </Box>
      <ToastContainer theme='dark'/>
    </Box>
  );
};

export default MyReservations;
