import React, { useState} from 'react';
import {JustSpider} from '../../../shared/components/just-spider'
import { JustNet } from '../components/just-net';
import Select, { SingleValue } from 'react-select';
import {
    Box,
    Text,
    Button,
    Icon,
    ButtonGroup,
    Stack,
    FormControl,
    FormLabel,
  } from '@chakra-ui/react';
import {
    FaCheck,
    FaArrowLeft,
} from 'react-icons/fa';
import { NavBar } from '../../../shared/components/nav-bar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface OptionType {
    value: string;
    label: string;
}

const EditPay: React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState<SingleValue<OptionType>>(null);

  const goBack = async () => {
    window.location.href = "http://localhost:3000/edit-reservation";
  };

  const handlePayment = async () => {
    if (!selectedPayment || selectedPayment.value === 'nothing') {
      toast.warning("Preencha todos os campos!");
      return;
    }
    toast.success("Reserva atualizada com sucesso!", {
      autoClose: 3000, // 3000ms = 3 seconds
      onClose: () => {
        window.location.href = "http://localhost:3000/my-reservations";
      },
    });
  };

  const options: OptionType[] = [
    { value: 'nothing', label: '' },
    { value: 'visa', label: 'Visa' },
    { value: 'mastercard', label: 'Mastercard' },
    { value: 'nubank', label: 'Nubank' }
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px solid #EAEAEA',
      color: '#191919',
      backgroundColor: state.isFocused ? '#EAEAEA' : '#FFF',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#EAEAEA'
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: '#6A0572',
      border: '1px solid #EAEAEA',
      color: '#EAEAEA'
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#EAEAEA'
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#EAEAEA',
      color: '#191919'
    })
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
        <JustSpider/>
        <JustNet/>
        <Box
          position="relative"
          width="400px"
          height="auto"
          border="2px solid #EAEAEA"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          left="0px" // Ajuste a posição para a esquerda
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
            Pagamento Reserva
            </Text>
            <Stack spacing={4} mt="30px" align="center" width="80%">
            <Text color="#EAEAEA" fontSize="2xl" textAlign="center">
              Novo valor total: R$ 3600,00
            </Text>
            <FormControl id="paymentMethod" isRequired>
              <FormLabel color="#EAEAEA">Método de Pagamento</FormLabel>
              <Select
                styles={customStyles}
                options={options}
                placeholder=""
                onChange={(option) => setSelectedPayment(option)}
              />
            </FormControl>
            <Button
              bg="transparent"
              color="#EAEAEA"
              border="1px solid #EAEAEA"
              width="100%"
              _hover={{ bg: '#EAEAEA', color: '#191919' }}
            >
              Cadastrar método de pagamento
            </Button>
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
              _hover={{ bg: '#0097B2', color: '#EAEAEA' }}
              rightIcon={<Icon as={FaCheck} />}
              width="146px"
              height="50px"
              onClick={handlePayment}
            >
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
      <ToastContainer theme="dark"/>
    </Box>


    );
}

export default EditPay;