import React from 'react';
import { JustSpider } from '../components/just-spider';
import { Box, Text, Icon, HStack, Button, VStack } from '@chakra-ui/react';
import { FaArrowLeft, FaWifi, FaCar, FaCoffee, FaSnowflake, FaConciergeBell, FaCheck, FaHeart, FaShareAlt } from 'react-icons/fa';
import { NavBar } from '../../../shared/components/nav-bar';
import 'react-toastify/dist/ReactToastify.css';

const SelectReservation: React.FC = () => {
    const reserve = async () => {
        window.location.href = "http://localhost:3000/create-reservation";
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
        <JustSpider />
        {/* Bloco roxo com sombra */}
        <Box position="absolute" left="200px" top="100px" width="500px">
          <Box
            position="relative"
            width="100%"
            height="300px"
            bg="#6A0572"
            zIndex="1"
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
            Zumbi Digital
          </Text>
          <Text color="#EAEAEA" fontSize="xl" textAlign="center">
            R$ 1200,00 a diária
          </Text>
          <HStack mt="10px" justify="center" spacing={4}>
            <HStack spacing={1}>
              <Icon as={FaWifi} color="#EAEAEA" />
              <Text color="#EAEAEA" fontSize="sm" whiteSpace="nowrap">
                Wi-Fi
              </Text>
            </HStack>
            <HStack spacing={1}>
              <Icon as={FaConciergeBell} color="#EAEAEA" />
              <Text color="#EAEAEA" fontSize="sm" whiteSpace="nowrap">
                Serviço de Quarto
              </Text>
            </HStack>
            <HStack spacing={1}>
              <Icon as={FaCoffee} color="#EAEAEA" />
              <Text color="#EAEAEA" fontSize="sm" whiteSpace="nowrap">
                Café da Manhã
              </Text>
            </HStack>
            <HStack spacing={1}>
              <Icon as={FaSnowflake} color="#EAEAEA" />
              <Text color="#EAEAEA" fontSize="sm" whiteSpace="nowrap">
                Ar-condicionado
              </Text>
            </HStack>
            <HStack spacing={1}>
              <Icon as={FaCar} color="#EAEAEA" />
              <Text color="#EAEAEA" fontSize="sm" whiteSpace="nowrap">
                Estacionamento
              </Text>
            </HStack>
          </HStack>
        </Box>

        {/* Botões empilhados à direita da imagem de aranha */}
        <VStack
          position="absolute"
          left="900px"
          top="120px"
          spacing={6}
        >
          <Button
            height= "50px"
            width= "250px"
            bg="#6A0572"
            color="#EAEAEA"
            border="1px solid #EAEAEA"
            _hover={{ bg: '#EAEAEA', color: '#6A0572' }}
            leftIcon={<Icon as={FaCheck} />}
            onClick={reserve}
          >
            Realizar Reserva
          </Button>
          <Button
            height= "50px"
            width= "250px"
            bg="#6A0572"
            color="#EAEAEA"
            border="1px solid #EAEAEA"
            _hover={{ bg: '#EAEAEA', color: '#6A0572' }}
            leftIcon={<Icon as={FaHeart} />}
          >
            Salvar Reserva
          </Button>
          <Button
            height= "50px"
            width= "250px"
            bg="#6A0572"
            color="#EAEAEA"
            border="1px solid #EAEAEA"
            _hover={{ bg: '#EAEAEA', color: '#6A0572' }}
            leftIcon={<Icon as={FaShareAlt} />}
          >
            Compartilhar Reserva
          </Button>
          <Button
            height= "50px"
            width= "250px"
            bg="#6A0572"
            color="#EAEAEA"
            border="1px solid #EAEAEA"
            _hover={{ bg: '#EAEAEA', color: '#6A0572' }}
            leftIcon={<Icon as={FaArrowLeft} />}
          >
            Voltar
          </Button>

        </VStack>
      </Box>
    </Box>
  );
};

export default SelectReservation;
