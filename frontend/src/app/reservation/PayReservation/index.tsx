import React, { useState, ForwardedRef } from 'react';
import { JustSpider } from "../../../shared/components/just-spider";
import {
  Box,
  Text,
  Button,
  Icon,
  ButtonGroup,
  Stack,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaWifi,
  FaCar,
  FaCoffee,
  FaSnowflake,
  FaConciergeBell,
} from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { NavBar } from '../../../shared/components/nav-bar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App: React.FC = () => {
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
            Quarto Zumbi Digital
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

        
      </Box>
      <ToastContainer theme="dark"/>
    </Box>
  );
};

export default App;
