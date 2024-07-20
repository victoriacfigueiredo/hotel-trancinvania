import React, { useState, ForwardedRef } from 'react';
import { JustSpider } from "../../components/just-spider";
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
import { NavBar } from '../../../../shared/components/nav-bar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom DatePicker Input
interface CustomDateInputProps {
  value?: string;
  onClick?: () => void;
}

const CustomDateInput = React.forwardRef(
  (props: CustomDateInputProps, ref: ForwardedRef<HTMLInputElement>) => (
    <InputGroup>
      <InputRightElement pointerEvents="none">
        <Icon as={FaCalendarAlt} color="#EAEAEA" />
      </InputRightElement>
      <Input
        bg="#6A0572"
        color="#EAEAEA"
        textAlign="center"
        border="1px solid #EAEAEA"
        value={props.value}
        onClick={props.onClick}
        ref={ref}
        width="146px"
        height="50px"
        placeholder=""
      />
    </InputGroup>
  ),
);

const CreateReservation: React.FC = () => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  const goBack = async () => {
    window.location.href = "http://localhost:3000/select-reservation";
  };

  const handleDataInput = async () => {
    if (checkInDate === null || checkOutDate === null) {
      toast.warning('Preencha todos os campos!');
    }
    else {
      window.location.href = "http://localhost:3000/pay-reservation";
    }
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
            top="-10px"
            bg="#191919"
            px="10px"
            color="#EAEAEA"
          >
            Dados da Reserva
          </Text>
          <Stack spacing={4} mt="30px" align="center" width="80%">
            {/* Check-in e Check-out */}
            <HStack spacing={6} width="100%" justify="space-between">
              <FormControl id="checkin" isRequired>
                <FormLabel color="#EAEAEA">Check-in</FormLabel>
                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => setCheckInDate(date)}
                  dateFormat="yyyy-MM-dd"
                  customInput={<CustomDateInput />}
                />
              </FormControl>
              <FormControl id="checkout" isRequired>
                <FormLabel color="#EAEAEA">Check-out</FormLabel>
                <DatePicker
                  selected={checkOutDate}
                  onChange={(date) => setCheckOutDate(date)}
                  dateFormat="yyyy-MM-dd"
                  customInput={<CustomDateInput />}
                />
              </FormControl>
            </HStack>
            {/* Quantidade de Quartos */}
            <FormControl id="quartos" isRequired>
              <FormLabel color="#EAEAEA">Quantidade de quartos</FormLabel>
              <NumberInput min={1} defaultValue={1} size="md">
                <NumberInputField
                  bg="#6A0572"
                  color="#EAEAEA"
                  textAlign="center"
                  border="1px solid #EAEAEA"
                />
                <NumberInputStepper>
                  <NumberIncrementStepper color="#EAEAEA" />
                  <NumberDecrementStepper color="#EAEAEA" />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            {/* Quantidade de Adultos */}
            <FormControl id="adultos" isRequired>
              <FormLabel color="#EAEAEA">Quantidade de adultos</FormLabel>
              <NumberInput min={1} defaultValue={1} size="md">
                <NumberInputField
                  bg="#6A0572"
                  color="#EAEAEA"
                  textAlign="center"
                  border="1px solid #EAEAEA"
                />
                <NumberInputStepper>
                  <NumberIncrementStepper color="#EAEAEA" />
                  <NumberDecrementStepper color="#EAEAEA" />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            {/* Quantidade de Crianças */}
            <FormControl id="criancas">
              <FormLabel color="#EAEAEA">Quantidade de crianças</FormLabel>
              <NumberInput min={0} defaultValue={0} size="md">
                <NumberInputField
                  bg="#6A0572"
                  color="#EAEAEA"
                  textAlign="center"
                  border="1px solid #EAEAEA"
                />
                <NumberInputStepper>
                  <NumberIncrementStepper color="#EAEAEA" />
                  <NumberDecrementStepper color="#EAEAEA" />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Stack>
          {/* Botões de navegação */}
          <ButtonGroup spacing="6" mt="30px">
            <Button
              bg="transparent"
              color="#EAEAEA"
              border="1px solid #EAEAEA"
              _hover={{ bg: '#EAEAEA', color: '#191919' }}
              leftIcon={<Icon as={FaArrowLeft} />}
              width="146px"
              height="50px"
              onClick={goBack}
            >
            </Button>
            <Button
              bg="transparent"
              color="#EAEAEA"
              border="1px solid #EAEAEA"
              _hover={{ bg: '#EAEAEA', color: '#191919' }}
              rightIcon={<Icon as={FaArrowRight} />}
              width="146px"
              height="50px"
              onClick={handleDataInput}
            >
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
      <ToastContainer theme="dark"/>
    </Box>
  );
};

export default CreateReservation;
