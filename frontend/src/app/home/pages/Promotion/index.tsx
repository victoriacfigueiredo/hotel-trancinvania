import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  FormControl, 
  FormLabel,
  Button, 
  Flex, 
  Select, 
  Text, 
  Box, 
} from '@chakra-ui/react';
import { ArrowBackIcon, CheckIcon } from '@chakra-ui/icons';
import logoImg from './logo.png';
import aranhaImg from './aranha.png';
import teiaImg from './teia.png';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import APIService from '../../../APIService';
import { PromotionType } from '../../../APIService';
import { LabelComponent } from '../PublishedReservation/Register';

export const Promotion = () => {
    const { reservation_id } = useParams();
    const [reservationData, setReservationData] = useState<any>([]);
    const [promoType, setPromoType] = useState('');
    const [discount, setDiscount] = useState('');
    const [numRooms, setNumRooms] = useState('');
    const [actionType, setActionType] = useState('');

    const navigate = useNavigate();
    const api = new APIService();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const action = params.get('action') ?? '';
        setActionType(action);

        const fetchReservationData = async () => {
            if(reservation_id){
                try {
                    const response = await api.getPublishedReservationById(+reservation_id);
                    setReservationData(response.data);
                } catch (error) {
                    console.error('Erro ao obter os dados da reserva:', error);
                }
            }
        };
        fetchReservationData();
    },[location, reservation_id]);

    const handlePromoTypeChange = (event) => {
        setPromoType(event.target.value);
    };

    const handleDiscountChange = (event) => {
        setDiscount(event.target.value);
    };

    const handleNumRoomsChange = (event) => {
        setNumRooms(event.target.value);
    };

    const handleConfirmRegister = async() => {
        if(discount === '' || promoType === undefined){
            toast.warning('Preencha todos os campos!');
        }else if(promoType === 'limiteQuarto' && numRooms === ''){
            toast.warning('Preencha todos os campos!');
        }
        else if(+discount < 5 || +discount > 60) {
            toast.warning('O desconto deve estar entre 5% e 60%');
        }else{
            try{
                if(reservation_id){
                    if (actionType === 'createSingle') {
                        if(promoType === 'ilimitada'){
                            await api.createPromotion(+reservation_id, parseInt(discount, 10), PromotionType.ILIMITADA);
                        }else{
                            await api.createPromotion(+reservation_id, parseInt(discount, 10), PromotionType.LIMITE_QUARTO, parseInt(numRooms, 10));
                        }
                        toast.success('Promoção cadastrada com sucesso!');
                    }else if (actionType === 'update') {
                        if(promoType === 'ilimitada'){
                            await api.updatePromotion(+reservation_id, parseInt(discount, 10), PromotionType.ILIMITADA);
                        }else{
                            await api.updatePromotion(+reservation_id, parseInt(discount, 10), PromotionType.LIMITE_QUARTO, parseInt(numRooms, 10));
                        }
                        toast.success('Promoção atualizada com sucesso!');
                    }
                }else{
                    if (actionType === 'createAll') {
                        if(promoType === 'ilimitada'){
                            await api.createPromotionAll(parseInt(discount, 10), PromotionType.ILIMITADA);
                        }else{
                            await api.createPromotionAll(parseInt(discount, 10), PromotionType.LIMITE_QUARTO, parseInt(numRooms, 10));
                        }
                        toast.success('Promoção cadastrada com sucesso!');
                    }
                }
                setTimeout(() => {
                    navigate('/publishedReservationList');
                }, 3000); 
            }catch(error){
                const err = error as { response: { data: { message: string } } };
                toast.error(`${err.response.data.message}`);
            }
        }
    }

    const handleComeBack = () => {
        if(actionType === 'createAll'){
            navigate('/publishedReservationList');
        }else{
            navigate(`/publishedReservationDetails/${reservation_id}`);
        }
    }
    
    const handlePriceChange = () => {
        const new_price = +reservationData.price * ((1 - (+discount)/100));
        return new_price.toFixed(2);
    }

    const price = +reservationData.price;

    return (
        <Box bg="#191919" minH="100vh" overflow="hidden" display="flex" flexDirection="column" justifyContent="space-between">
            <Header />
            <Box as="main" mt="30px">
            <Box border="2px solid #eaeaea" borderRadius="5px" p="20px" textAlign="center" mx="auto" maxW="360px" position="relative">
                    <Text fontSize="20px" color="#eaeaea" fontWeight="bold" position="absolute" top="-14px" bg="#191919" px="10px" mx="auto" left="20%">
                        Dados da Promoção
                    </Text>
                        <Flex flexDirection="column" mt="20px">
                            <LabelComponent value="Desconto" type="number" input={discount} onChange={handleDiscountChange} />
                            <FormControl mb="15px">
                                <FormLabel htmlFor="promoType" color="white" mb="8px">Promoção</FormLabel>
                                <Select isRequired onChange={handlePromoTypeChange} bg="#6A0572" color="white" borderRadius="4px" border="1px solid #eaeaea">
                                    <option value='nothig' style={{ backgroundColor: '#6A0572' }}></option>
                                    <option value='ilimitada' style={{ backgroundColor: '#6A0572' }}>Ilimitada</option>
                                    <option value='limiteQuarto' style={{ backgroundColor: '#6A0572' }}>Limite de Quarto</option>
                                </Select>
                            </FormControl>
                            {promoType === 'limiteQuarto' && (
                                <LabelComponent value="Quantidade de Quartos" type="number" input={numRooms} onChange={handleNumRoomsChange} />
                            )}
                            {reservation_id && (
                                <Box mb="25px">
                                    <FormLabel htmlFor="valor" color="white" mb="8px">Valor</FormLabel>
                                    <Flex justify="center" alignItems="center">
                                        <Text bg="#6A0572" color="white" p="7px" borderRadius="4px" border="1px solid #eaeaea" width="100%">R$ {price.toFixed(2)}</Text>
                                        <Text color="white" fontSize="24px" mx="10px">→</Text>
                                        <Text bg="#6A0572" color="white" p="7px" borderRadius="4px" border="1px solid #eaeaea" width="100%">R$ {handlePriceChange()}</Text>
                                    </Flex>
                                </Box>
                            )}
                            <Flex justify="space-between" mt="10px">
                                <Button leftIcon={<ArrowBackIcon />} onClick={handleComeBack} border="1px solid white" borderRadius="4px" color="white" bg="transparent" maxW="160px" px="10px" py="10px" fontSize="16px" flex="1" ml="0" mr="10px" _hover={{ bg: "white", color: "#191919" }} fontWeight="none">
                                    Voltar
                                </Button>
                                <Button rightIcon={<CheckIcon />} onClick={handleConfirmRegister} border="1px solid white" borderRadius="4px" color="white" bg="transparent" maxW="160px" px="10px" py="10px" fontSize="16px"  flex="1" ml="10px" mr="0" _hover={{ bg: "white", color: "#191919" }} fontWeight="none">
                                    Confirmar
                                </Button>
                            </Flex>
                        </Flex>
                    </Box>
                <Box bgImage={`url(${aranhaImg})`} position="absolute" top="90px" left="85%" w="200px" h="350px" bgSize="contain" bgRepeat="no-repeat" />
            </Box>
                <Footer />
                <ToastContainer position="top-right" theme='dark' autoClose={3000}/>
        </Box>);
    }

export const Header = () => {
    return (
        <Box as="header" bg="#eaeaea" h="90" display="flex" justifyContent="space-between">
            <Box bgImage={`url(${logoImg})`} w="160px" h="90px" ml="20px" bgSize="cover" />
            <Box fontSize="18px" color="#a4161a" fontWeight="bold" m="30px" p="7px">
                marialet
            </Box>
        </Box>
    );
}

export const Footer = () => {
    return (
        <Box>
            <Box bgImage={`url(${teiaImg})`} position="absolute" bottom="0px" left="0px" w="400px" h="350px" bgSize="contain" bgRepeat="no-repeat" />
            <Box as="footer" bg="#191919" h="50px" display="flex" justifyContent="center" />
        </Box>
    )
}

export const TeiaImg = () => {
    return (<Box bgImage={`url(${aranhaImg})`} position="absolute" top="90px" left="85%" w="200px" h="350px" bgSize="contain" bgRepeat="no-repeat" />);
}


