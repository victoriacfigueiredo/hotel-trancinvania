import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Box,
    Button,
    Flex,
    HStack,
    Icon,
    Text,
} from '@chakra-ui/react';
import { AddIcon, ArrowBackIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { TeiaImg } from '../../../Promotion/pages';
import APIServicePromotion from '../../../Promotion/APIService';
import APIServicePublishedReservation from '../../APIService';
import { useNavigate, useParams } from 'react-router-dom';
import { NavBar } from '../../../../shared/components/nav-bar';
import { FaCar, FaCoffee, FaConciergeBell, FaSnowflake, FaWifi } from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6';
import {MdOutlineBedroomChild} from 'react-icons/md';

export const ReservationDetails = () => {
    const { reservation_id } = useParams();
    const [reservationData, setReservationData] = useState<any>([]);
    const [updateFlag, setUpdateFlag] = useState(false);
    const [promotionData, setPromotionData] = useState<any>([]);

    const navigate = useNavigate();

    const apiPromotion = new APIServicePromotion();
    const apiPublishedReservation = new APIServicePublishedReservation();

    useEffect(() => {
        const fetchReservationData = async () => {
            if(reservation_id){
                try {
                    const response = await apiPublishedReservation.getPublishedReservationById(+reservation_id) ?? '';
                    setReservationData(response.data);
                    const promotion = await apiPromotion.getPromotionById(+reservation_id);
                    if(promotion){
                        setPromotionData(promotion.data);
                    }
                } catch (error) {
                    console.error('Erro ao obter os dados da reserva:', error);
                }
            }
        };

        fetchReservationData();
    }, [reservation_id, updateFlag]);

    const handleDeleteReservation = async() => {
        try{
            if(reservation_id){
                await apiPublishedReservation.deletePublishedReservation(+reservation_id);
                toast.success('Reserva deletada com sucesso!');
                setTimeout(() => {
                    navigate('/publishedReservationList');
                }, 3000); 
            }
        }catch(error){
            const err = error as { response: { data: { message: string } } };
            toast.error(`${err.response.data.message}`);
        }
    }

    const handleDeletePromotion = async() => {
        try{
            if(reservation_id){
                await apiPromotion.deletePromotion(+reservation_id);
                toast.success('Promoção deletada com sucesso!');
                setUpdateFlag(!updateFlag); // Troca o valor do updateFlag para atualizar os dados
            }
        }catch(error){
            const err = error as { response: { data: { message: string } } };
            toast.error(`${err.response.data.message}`);
        }
    }

    const price = +reservationData.price;
    const new_price = +reservationData.new_price;

    return(<Box bg="#191919" minH="100vh" display="flex" flexDirection="column">
            <NavBar/>
            <Box ml="20px">
            <Flex flex="1" bg="#191919" justifyContent="center" alignItems="center" position="relative">
                <Box position="absolute" left="100px" top="70px" width="500px">
                    <Box position="relative" width="100%" height="300px" bg="#6A0572" zIndex="1" backgroundSize="cover" backgroundPosition="center" style={{backgroundImage: `url(http://localhost:5001${reservationData.imageUrl})`}}/>
                    <Box position="absolute" width="100%" height="300px" bg="rgba(255, 255, 255, 0.1)" top="10px" left="10px" zIndex="0" />
                    <Text mt="20px" color="#EAEAEA" fontSize="2xl" fontWeight="bold" textAlign="center">
                        {reservationData.name}
                    </Text>
                    {reservationData.promotion_id ? (
                            <Text color="#EAEAEA" fontSize="xl" textAlign="center">
                                 R$ {new_price.toFixed(2)} a diária ({promotionData.discount}% OFF)
                            </Text>
                        ) : (
                            <Text color="#EAEAEA" fontSize="xl" textAlign="center">
                                R$ {price.toFixed(2)} a diária
                            </Text>
                        )}
                    <HStack mt="10px" justify="center" spacing={4}>
                        {reservationData.wifi &&  <ServicesComponent value="Wi-Fi" icon={FaWifi}/>}
                        {reservationData.room_service &&  <ServicesComponent value="Serviço de Quarto" icon={FaConciergeBell}/>}
                        {reservationData.breakfast &&  <ServicesComponent value="Café da Manhã" icon={FaCoffee}/>}
                        {reservationData.airConditioner &&  <ServicesComponent value="Ar-condicionado" icon={FaSnowflake}/>}
                        {reservationData.parking &&  <ServicesComponent value="Estacionamento" icon={FaCar}/>}
                    </HStack>
                </Box>
                    <Flex flexDirection={'column'} gap="12px" ml="320px" mt="70px">
                        <Box mb="25px">
                            <DataComponent value={`${reservationData.rooms} Quartos`} icon={MdOutlineBedroomChild}/>
                            <Box boxSize="12px"></Box>
                            <DataComponent value={`${reservationData.people} Pessoas`} icon={FaPerson}/>
                        </Box>
                        <ButtonComponent label="Editar Reserva" icon = {<EditIcon/>} onClick={() => navigate(`/publishedReservationUpdate/${reservationData.id}`)}/>
                        <ButtonComponent label="Deletar Reserva" icon = {<DeleteIcon/>} onClick={handleDeleteReservation}/>
                        <ButtonComponent label="Cadastrar Promoção" icon={<AddIcon/>} onClick={() => navigate(`/promotions/${reservation_id}?action=createSingle`)}/>
                        <ButtonComponent label="Editar Promoção" icon={<EditIcon />} onClick={() => navigate(`/promotions/${reservation_id}?action=update`)}/>
                        <ButtonComponent label="Deletar Promoção" icon={<DeleteIcon />} onClick={handleDeletePromotion}/>
                        <ButtonComponent label="Voltar" icon = {<ArrowBackIcon />} onClick={() => navigate('/publishedReservationList')}/>
                    </Flex>    
                </Flex>
                <TeiaImg />
            </Box>
            <ToastContainer position='top-right' theme='dark' />
    </Box>)
}

const ButtonComponent = ({label, icon, onClick}) => {
    return (
        <Button border="1px solid white" borderRadius="4px" color="#eaeaea" bg="#6A0572" w="100%" p="10px" fontSize="16px" leftIcon={icon} onClick={onClick} _hover={{color: "#191919", bg: "#eaeaea"}}>
            {label}
        </Button>
    )
}

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

const DataComponent = ({icon, value}) => {
    return (
        <HStack spacing={1}>
            <Icon as={icon} color="#EAEAEA" boxSize="30px"/>
            <Text color="#EAEAEA" fontSize="20px" whiteSpace="nowrap">
                {value}
            </Text>
        </HStack>
    )
}



