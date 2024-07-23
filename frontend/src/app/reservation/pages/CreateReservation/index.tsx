import React, {ForwardedRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  Divider,
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
  FaCheck
} from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { NavBar } from '../../../../shared/components/nav-bar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { getPublishedReservationById } from '../../../PublishedReservation/services'
import { PublishedReservationModel } from '../../../PublishedReservation/models/publishedReservation'
import {
  Step,
  StepSeparator,
  Stepper,
  useSteps,
} from '@chakra-ui/react';
import Select, { SingleValue} from 'react-select';
import { useClientData } from "../../../auth/hooks/useUserData"
import { createReservation } from '../../services';
import { getAllPayMethod } from '../../../payment/services'


interface OptionType {
  value: string;
  label: string;
}

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
        fontSize= "sm"
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

const steps = [
  { title: 'Dados da Reserva', description: 'Informações sobre a reserva' },
  { title: 'Pagamento', description: 'Detalhes do pagamento' },
];

const CreateReservation: React.FC = () => {
  const { reservation_id } = useParams();
  const [reservationData, setReservationData] = useState<PublishedReservationModel>({} as PublishedReservationModel);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [quartos, setQuartos] = useState(1);
  const [adultos, setAdultos] = useState(1);
  const [criancas, setCriancas] = useState(0);
  const { activeStep, setActiveStep } = useSteps({ index: 0 });
  const [selectedPayment, setSelectedPayment] = useState<SingleValue<OptionType>>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentOptions, setPaymentOptions] = useState<OptionType[]>([]);
  const { data } = useClientData();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservationData = async () => {
        if(reservation_id){
            try {
                const response = await getPublishedReservationById(+reservation_id) ?? '';
                setReservationData(response);
            } catch (error) {
                console.error('Erro ao obter os dados da reserva:', error);
            }
        }
    };
    fetchReservationData();
}, [reservation_id]);

useEffect(() => {
  const calculateDays = (startDate: Date | null, endDate: Date | null) => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const days = calculateDays(checkInDate, checkOutDate);
  const price = days * quartos * reservationData.new_price;
  setTotalPrice(price);
}, [checkInDate, checkOutDate, quartos, reservationData.new_price]);

  const handleDataInput = async () => {
    if (checkInDate === null || checkOutDate === null) {
      toast.warning('Preencha todos os campos!');
    }
    else if(adultos + 0.5*criancas > reservationData.people){
      toast.warning('A capacidade do quarto foi excedida');
    }
    else if(checkInDate >= checkOutDate){
      toast.warning('A data de check-in deve preceder a data de check-out');
    }
    else {
      setActiveStep(1);
    }
  }; 

  const handleGoBack = async() => {
    setActiveStep(0);
  }

  const handlePayment = async () => {
    const clientId = Number(data?.id);
    const publishedReservationId = reservationData.id;
    if (!selectedPayment || selectedPayment.value === 'nothing') {
      toast.warning("Preencha todos os campos!");
      return;
    }
    if (checkInDate === null || checkOutDate === null) {
      toast.warning("Preencha as datas de check-in e check-out!");
      return;
    }
    //console.log(`${data?.id}`);    
    const checkInDateString = checkInDate?.toISOString().split('T')[0]; // Converte a data para string no formato yyyy-mm-dd
    const checkOutDateString = checkOutDate?.toISOString().split('T')[0];
    try{
      await createReservation(clientId, publishedReservationId, quartos, checkInDateString, checkOutDateString, adultos, criancas, selectedPayment.value)
      toast.success("Reserva realizada com sucesso!", {
        autoClose: 3000, // 3000ms = 3 seconds
        onClose: () => {
          navigate(`/my-reservations`)
        },
      });
    }
    catch(error){
      const err = error as { response: { data: { message: string } } };
                toast.warning(`${err.response.data.message}`);
    }
  };


  // const options: OptionType[] = [
  //   { value: 'nothing', label: '' },
  //   { value: '1', label: '1' },
  //   { value: '2', label: '2' },
  //   { value: '3', label: '3' }
  // ];


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

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const payMethods = await getAllPayMethod(Number(data?.id));
        const options = payMethods.map(method => {
          const censoredNumCard = `**** **** **** ${method.numCard.slice(-4)}`;
          return {
            value: method.numCard,
            label: censoredNumCard
          };
        });
        setPaymentOptions(options);
      } catch (error) {
        //const err = error as { response: { data: { message: string } } };
        toast.warning(`Cadastre um método de pagamento!`);
      }
    };

    fetchPaymentMethods();
  }, []);
 
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
            backgroundSize="cover"
            backgroundPosition="center"
            style={{backgroundImage: `url(http://localhost:5001${reservationData.imageUrl})`}}
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
            {reservationData.name}
          </Text>
          <Text color="#EAEAEA" fontSize="xl" textAlign="center" display="flex" alignItems="center" justifyContent="center">
            R$ {reservationData.new_price}.00 a diária
            <Divider orientation="vertical" borderColor="#EAEAEA" height="20px" mx = {2}/>
            <Icon as={FaPerson} color="#EAEAEA" />
            {reservationData.people} hóspedes
          </Text>




          <HStack mt="10px" justify="center" spacing={4}>
                        {reservationData.wifi &&  <ServicesComponent value="Wi-Fi" icon={FaWifi}/>}
                        {reservationData.room_service &&  <ServicesComponent value="Serviço de Quarto" icon={FaConciergeBell}/>}
                        {reservationData.breakfast &&  <ServicesComponent value="Café da Manhã" icon={FaCoffee}/>}
                        {reservationData.airConditioner &&  <ServicesComponent value="Ar-condicionado" icon={FaSnowflake}/>}
                        {reservationData.parking &&  <ServicesComponent value="Estacionamento" icon={FaCar}/>}
          </HStack>
        </Box>
        <Stepper index={activeStep}>
          {steps.map((_, index) => (
            <Step key={index}>
              {index === 0 && activeStep === 0 && (
                <Box
                  position="relative"
                  width="400px"
                  height="auto"
                  border="2px solid #EAEAEA"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  left="300px"
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
                  <Stack spacing={4} mt="30px" align="center" width="80%">
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
                    <FormControl id="quartos" isRequired>
                      <FormLabel color="#EAEAEA">Quantidade de quartos</FormLabel>
                      <NumberInput min={1} defaultValue={1} size="md" value={quartos} onChange={(_, valueAsNumber) => setQuartos(valueAsNumber)}>
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
                    <FormControl id="adultos" isRequired>
                      <FormLabel color="#EAEAEA">Quantidade de adultos</FormLabel>
                      <NumberInput min={1} defaultValue={1} size="md" value={adultos} onChange={(_, valueAsNumber) => setAdultos(valueAsNumber)}>
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
                    <FormControl id="criancas">
                      <FormLabel color="#EAEAEA">Quantidade de crianças</FormLabel>
                      <NumberInput min={0} defaultValue={0} size="md" value={criancas} onChange={(_, valueAsNumber) => setCriancas(valueAsNumber)}>
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
                  <ButtonGroup spacing="6" mt="30px">
                    <Button
                      bg="transparent"
                      color="#EAEAEA"
                      border="1px solid #EAEAEA"
                      _hover={{ bg: '#EAEAEA', color: '#191919' }}
                      leftIcon={<Icon as={FaArrowLeft} />}
                      width="146px"
                      height="50px"
                      onClick={() => navigate(`/select-reservation/${reservationData.id}`)}
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
              )}

              {index === 1 && activeStep === 1 && (
                <Box
                  position="relative"
                  width="400px"
                  height="auto"
                  border="2px solid #EAEAEA"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  left="270px"
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
                    Pagamento
                  </Text>
                  <Stack spacing={4} mt="30px" align="center" width="80%">
                    <Text color="#EAEAEA" fontSize="2xl" textAlign="center">
                      Valor total: R$ {totalPrice.toFixed(2)}
                    </Text>
                    <FormControl id="paymentMethod" isRequired>
                      <FormLabel color="#EAEAEA">Método de Pagamento</FormLabel>
                      <Select
                        styles={customStyles}
                        options={paymentOptions}
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
                  <ButtonGroup spacing="6" mt="30px">
                    <Button
                      bg="transparent"
                      color="#EAEAEA"
                      border="1px solid #EAEAEA"
                      _hover={{ bg: '#EAEAEA', color: '#191919' }}
                      leftIcon={<Icon as={FaArrowLeft} />}
                      width="146px"
                      height="50px"
                      onClick={handleGoBack}
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
              )}

              <StepSeparator />
            </Step>
          ))}
      </Stepper>
      </Box>
      <ToastContainer theme="dark"/>
    </Box>
  );
};




const ServicesComponent = ({icon, value}) => {
  return (
      <HStack spacing={1}>
          <Icon as={icon} color="#EAEAEA" />
          <Text color="#EAEAEA" fontSize="sm" whiteSpace="nowrap">
              {value}
          </Text>
      </HStack>
  )
}




export default CreateReservation;
