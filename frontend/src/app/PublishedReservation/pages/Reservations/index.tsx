import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Box,
    Button,
    Flex,
} from '@chakra-ui/react';
import maisImg from './mais.png';
import morcegoImg from './bat.png';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../../../shared/components/nav-bar';
import { deleteAllPromotions, getPromotionById } from '../../../Promotion/services';
import { getAllPublishedReservation } from '../../services';
import { PublishedReservationModel } from '../../models/publishedReservation';
import { PromotionModel } from '../../../Promotion/models/promotion';


export const AllPublishedReservation = () => {
    const [reservations, setReservations] = useState<PublishedReservationModel[]>([]);
    const [promotion, setPromotion] = useState<PromotionModel>({} as PromotionModel);

    useEffect(() => {
        const fetchReservations = async () => {
          try {
            const response = await getAllPublishedReservation();
            setReservations(response);
          } catch (error) {
            console.error('Erro ao obter as reservas:', error);
          }
        };
    
        fetchReservations();
      });

    const navigate = useNavigate();

    const handleDeletePromotion = async() => {
        try{
            await deleteAllPromotions(1);
            toast.success('Promoções deletadas com sucesso!');
        }catch(error){
            const err = error as { response: { data: { message: string } } };
            toast.error(`${err.response.data.message}`);
        }
    }

    const handlePromotionChange = async (reservation_id: number) => {
        try {
            const data = await getPromotionById(reservation_id);
            const discount = data.discount ?? 0;
            setPromotion((prevPromotions) => ({
                ...prevPromotions,
                [reservation_id]: discount,
            }));
        } catch (error) {
            console.error('Erro ao obter promoção:', error);
        }
    };

    useEffect(() => {
        reservations.forEach((reservation) => {
            if (reservation.promotion_id) {
                handlePromotionChange(reservation.id);
            }
        });
    }, [reservations]);


    return (
        <Box bg="#191919" minH="100vh" display="flex" flexDirection="column">
            <NavBar/>
            <Box p="50px" position="relative">
                    
                <Flex gap="20px">
                    <ButtonComponent label="Publicar Reserva" onClick={() => navigate('/publishedReservation')}/>
                    <ButtonComponent label="Cadastrar Promoção" onClick={() => navigate('/promotions?action=createAll')}/>
                    <ButtonComponent label="Deletar Promoções" onClick={handleDeletePromotion}/>
                </Flex>
                
                <Flex flexWrap="wrap" gap="75px" mt="50px">
                    {reservations.filter(reservation => reservation.hotelier_id === 1).map(reservation => (
                        <Box position="relative" w="250px" h="300px" _hover={{transform: 'translateY(-5px)'}}>
                            {reservation.promotion_id && (
                                <Flex alignItems="center" justifyContent="center" color="#eaeaea" fontSize="20px" textAlign="center" position="absolute" bottom="77%" left="80%" width="90px" height="90px" backgroundSize="contain" backgroundRepeat="no-repeat" zIndex="1" style={{ backgroundImage: `url(${morcegoImg})` }}> <Box transform={'translateY(-60%)'} fontSize="13px">{promotion[reservation.id] !== 0 && `${promotion[reservation.id]}%`}</Box></Flex>
                            )}
                            <Box position="relative" w="270px" h="300px" bg="transparent"  borderRadius="10px" overflow="hidden" color="#191919" cursor="pointer" key={reservation.id} onClick={() => navigate(`/publishedReservationDetails/${reservation.id}`)}>
                                <Box w="100%" h="72%" backgroundSize="cover" backgroundPosition="center" borderBottomLeftRadius="10px" borderBottomRightRadius="10px"  style={{backgroundImage: `url(http://localhost:5001${reservation.imageUrl})`}}></Box>
                                <Box fontSize="20px" color="#eaeaea" textAlign="start" fontWeight="bold">{reservation.name}</Box>
                                    <Flex textAlign="start" fontSize="20px" color="#eaeaea">R$ {reservation.new_price.toFixed(0)} { reservation.promotion_id &&   <Box fontSize="15px" textDecoration="line-through" ml="5px" mt="3px"> R$ {reservation.price}</Box>}</Flex>
                                    <Box color="#eaeaea" mt="-2%"> a diária</Box>
                            </Box>
                        </Box>
                    ))}
                    <Box position="relative" width="270px" height="280px" bg="transparent" border="1px solid #eaeaea" borderRadius="10px" overflow="hidden" cursor="pointer" display="flex" alignItems="center" justifyContent="center" _hover={{transform: 'translateY(-5px)'}} onClick={() => navigate('/publishedReservation')}> <Box width="40%" height="40%" backgroundSize="contain" backgroundPosition="center" backgroundRepeat="no-repeat" style={{ backgroundImage: `url(${maisImg})` }}></Box></Box>
                </Flex>
            </Box>
            <ToastContainer position="top-right" theme='dark'/>
        </Box>
    );
}

const ButtonComponent = ({label, onClick}) => {
    return (
        <Button bg="#eaeaea" onClick={onClick}>
            {label}
        </Button>
    )
}