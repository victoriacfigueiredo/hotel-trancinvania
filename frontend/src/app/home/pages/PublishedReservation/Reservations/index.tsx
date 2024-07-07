import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Box,
    Button,
    Flex,
} from '@chakra-ui/react';
import './style.css';
import { Header } from '../../Promotion';
import APIService from '../../../../APIService';
import maisImg from './mais.png';
import hotelImg from './hotel.png';
import morcegoImg from './bat.png';
import { useNavigate } from 'react-router-dom';

export const AllPublishedReservation = () => {
    const [reservations, setReservations] = useState<any[]>([]);
    const [promotion, setPromotion] = useState<any>({});

    const api = new APIService();

    useEffect(() => {
        const fetchReservations = async () => {
          try {
            const response = await api.getAllPublishedReservation();
            setReservations(response.data);
          } catch (error) {
            console.error('Erro ao obter as reservas:', error);
          }
        };
    
        fetchReservations();
      });

    const navigate = useNavigate();

    const handleDeletePromotion = async() => {
        try{
            await api.deleteAllPromotions();
            toast.success('Promoções deletadas com sucesso!');
        }catch(error){
            const err = error as { response: { data: { message: string } } };
            toast.error(`${err.response.data.message}`);
        }
    }

    const handlePromotionChange = async (reservation_id: number) => {
        const prom = await api.getPromotionById(reservation_id);
            setPromotion((prevPromotions) => ({
                ...prevPromotions,
                [reservation_id]: prom.data.discount,
            }));
    }

    useEffect(() => {
        reservations.forEach((reservation) => {
            if (reservation.promotion_id) {
                handlePromotionChange(reservation.id);
            }
        });
    }, [reservations]);


    return (
        <Box bg="#191919" minH="100vh" display="flex" flexDirection="column">
            <Header/>
            <Box p="50px" position="relative">
                    
                <Flex gap="20px">
                    <ButtonComponent label="Publicar Reserva" onClick={() => navigate('/publishedReservation')}/>
                    <ButtonComponent label="Cadastrar Promoção" onClick={() => navigate('/promotions?action=createAll')}/>
                    <ButtonComponent label="Deletar Promoções" onClick={handleDeletePromotion}/>
                </Flex>
                
                <Flex flexWrap="wrap" gap="75px" mt="50px">
                    {reservations.filter(reservation => reservation.hotelier_id === 1).map(reservation => (
                        <Box position="relative" w="250px" h="250px" mb="20px" _hover={{transform: 'translateY(-5px)'}}>
                            {reservation.promotion_id && (
                                <Flex alignItems="center" justifyContent="center" color="#eaeaea" fontSize="20px" textAlign="center" position="absolute" bottom="75%" left="80%" width="90px" height="90px" backgroundSize="contain" backgroundRepeat="no-repeat" zIndex="1" style={{ backgroundImage: `url(${morcegoImg})` }}> <Box transform={'translateY(-60%)'} fontSize="13px">{promotion[reservation.id] !== undefined ? promotion[reservation.id] : ' '}%</Box></Flex>
                            )}
                            <Box position="relative" w="270px" h="250px" bg="#eaeaea" border="1px solid #eaeaea" borderRadius="5px" overflow="hidden" color="#191919" cursor="pointer" key={reservation.id} onClick={() => navigate(`/publishedReservationDetails/${reservation.id}`)}>
                                <Box w="100%" h="72%" backgroundSize="cover" backgroundPosition="center" borderTopLeftRadius="5px" borderTopRightRadius="5px" style={{backgroundImage: `url(${hotelImg})`}}></Box>
                                <Box fontSize="20px" textAlign="center">{reservation.name}</Box>
                                    <Flex textAlign="center" alignItems="center" justifyContent="center" color="#191919">R$ {reservation.new_price.toFixed(2)}<Box ml="5px"> a diária</Box></Flex>
                            </Box>
                        </Box>
                    ))}
                    <Box position="relative" width="270px" height="250px" bg="transparent" border="1px solid #eaeaea" borderRadius="5px" overflow="hidden" cursor="pointer" display="flex" alignItems="center" justifyContent="center" _hover={{transform: 'translateY(-5px)'}} onClick={() => navigate('/publishedReservation')}> <Box width="40%" height="40%" backgroundSize="contain" backgroundPosition="center" backgroundRepeat="no-repeat" style={{ backgroundImage: `url(${maisImg})` }}></Box></Box>
                </Flex>
            </Box>
            <ToastContainer position="top-right" theme='dark'/>
        </Box>
    );
}

const ButtonComponent = ({label, onClick}) => {
    return (
        <Button onClick={onClick}>
            {label}
        </Button>
    )
}