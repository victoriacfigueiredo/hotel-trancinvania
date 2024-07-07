import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Box,
    Button,
    Flex,
} from '@chakra-ui/react';
import { AddIcon, ArrowBackIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import './style.css';
import { Footer, Header, TeiaImg } from '../../Promotion';
import APIService from '../../../../APIService';
import { useNavigate, useParams } from 'react-router-dom';

export const ReservationDetails = () => {
    const { reservation_id } = useParams();
    const [reservationData, setReservationData] = useState<any>([]);

    const navigate = useNavigate();

    const api = new APIService();

    useEffect(() => {
        const fetchReservationData = async () => {
            if(reservation_id){
                try {
                    const response = await api.getPublishedReservationById(+reservation_id) ?? '';
                    setReservationData(response.data);
                } catch (error) {
                    console.error('Erro ao obter os dados da reserva:', error);
                }
            }
        };

        fetchReservationData();
    }, [reservation_id]);

    const handleDeleteReservation = async() => {
        try{
            if(reservation_id){
                await api.deletePublishedReservation(+reservation_id);
                toast.success('Reserva deletada com sucesso!');
            }
        }catch(error){
            const err = error as { response: { data: { message: string } } };
            toast.error(`${err.response.data.message}`);
        }
    }

    const handleDeletePromotion = async() => {
        try{
            if(reservation_id){
                await api.deletePromotion(+reservation_id);
                toast.success('Reserva deletada com sucesso!');
            }
        }catch(error){
            const err = error as { response: { data: { message: string } } };
            toast.error(`${err.response.data.message}`);
        }
    }

    const price = +reservationData.price;
    const new_price = +reservationData.new_price;

    return(<Box bg="#191919" minH="100vh" display="flex" flexDirection="column">
            <Header/>
            <Box mt="60px">
                <Box border="2px solid #eaeaea" borderRadius="5px" p="30px" textAlign="center" mx="auto" maxW="750px" position="relative">
                    <Box fontSize="18px" color="#eaeaea" fontWeight="bold" position="absolute" top="-14px" bg="#191919" px="10px" mx="auto">
                        {reservationData.name}
                    </Box>
                    <Flex justifyContent="space-between" color="#eaeaea">
                        <Flex flexDirection="column">
                            <Box width="300px" height="169px" ml="30px" bg="#6A0572" border="1px solid #eaeaea"></Box>
                            <Flex mt="25px">
                                <Flex flexDirection={'column'} gap="10px">
                                    <ButtonComponent label="Editar Reserva" icon = {<EditIcon/>} onClick={() => navigate('/publishedReservation')}/>
                                    <ButtonComponent label="Deletar Reserva" icon = {<DeleteIcon/>} onClick={handleDeleteReservation}/>
                                    <ButtonComponent label="Voltar" icon = {<ArrowBackIcon />} onClick={() => navigate('/publishedReservationList')}/>
                                </Flex>
                                <Box w="7px"></Box>
                                <Flex flexDirection={'column'} gap="10px">
                                    <ButtonComponent label="Cadastrar Promoção" icon={<AddIcon/>} onClick={() => navigate(`/promotions/${reservation_id}?action=createSingle`)}/>
                                    <ButtonComponent label="Editar Promoção" icon={<EditIcon />} onClick={() => navigate(`/promotions/${reservation_id}?action=update`)}/>
                                    <ButtonComponent label="Deletar Promoção" icon={<DeleteIcon />} onClick={handleDeletePromotion}/>
                                </Flex>
                            </Flex>
                    </Flex>
                        <Flex flexDirection="column" w="90%" h="100%" maxW="270px" border="1px solid #eaeaea"  bg="#6A0572" p="10px" fontSize="18px" borderRadius="5px">
                            <DataComponent label="Quartos:" value={reservationData.rooms}/>
                            <DataComponent label="Pessoas:" value={reservationData.people}/>
                            <DataComponent label="Valor:" value={price.toFixed(2)}/>
                            {reservationData.promotion_id ? <DataComponent label="Promoção:" value={new_price.toFixed(2)}/> : <DataComponent label="Promoção:" value="Não"/>}
                            <Box m="5px">
                                <Flex flexDirection="column" gap="5px" alignItems="center" justifyContent="center" textAlign="center">
                                    {[
                                        { label: 'WiFi', active: reservationData.wifi },
                                        { label: 'Café da Manhã', active: reservationData.breakfast },
                                        { label: 'Ar-Condicionado', active: reservationData.airConditioner },
                                        { label: 'Estacionamento', active: reservationData.parking },
                                        { label: 'Serviço de Quarto', active: reservationData.room_service },
                                    ].map((service, index) => (
                                        <Flex key={index} justifyContent="space-between" width="100%">
                                            <Box>{service.label}</Box>
                                            <Box>{service.active ? 'Sim' : 'Não'}</Box>
                                        </Flex>
                                    ))}
                                </Flex>
                            </Box>
                        </Flex>
                    </Flex>
                </Box>
                <TeiaImg />
            </Box>
            <ToastContainer position='top-right' theme='dark' />
    </Box>)
}

const ButtonComponent = ({label, icon, onClick}) => {
    return (
        <Button border="1px solid white" borderRadius="4px" color="#eaeaea" bg="transparent" w="100%" p="10px" fontSize="16px" leftIcon={icon} onClick={onClick} _hover={{color: "#191919", bg: "#eaeaea"}}>
            {label}
        </Button>
    )
}

const DataComponent = ({label, value}) => {
    return (
        <Flex justifyContent={'space-between'} m="5px">
            <Box>{label}</Box>
            <Box>{label === "Valor:" ? `R$ ${value}` : value}</Box>
        </Flex>
    )
}

