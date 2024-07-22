import React from 'react';
import { JustSpider } from '../../components/just-spider';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Text, Icon, HStack, Button, VStack, Divider } from '@chakra-ui/react';
import { FaArrowLeft, FaWifi, FaCar, FaCoffee, FaSnowflake, FaConciergeBell, FaCheck, FaHeart, FaShareAlt } from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6';
import { NavBar } from '../../../../shared/components/nav-bar';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { saveReservation } from '../../../Wishlist/services';
import { getPublishedReservationById } from '../../../PublishedReservation/services';
import { PublishedReservationModel } from '../../../PublishedReservation/models/publishedReservation';
import { SaveModel } from '../../../Wishlist/models';
import { ToastContainer, toast } from 'react-toastify'; 
import { useClientData } from '../../../auth/hooks/useUserData';
//import { getPublishedReservationWithHotelierById } from '../../../PublishedReservation/services';
//import { PublishedHotelierModel } from '../../models/publishedhotelier'

const SelectReservation: React.FC = () => {
    const { data } = useClientData();
    const clientId = Number(data?.id);
    const { reservation_id } = useParams();
    //const [reservationData, setReservationData] = useState<PublishedHotelierModel>({} as PublishedHotelierModel);
    const [reservationData, setReservationData] = useState<PublishedReservationModel>({} as PublishedReservationModel);
    useEffect(() => {
        const fetchReservationData = async () => {
            if (reservation_id) {
                try {
                    //console.log('Fetching reservation data for ID:', reservation_id);
                    const response = await getPublishedReservationById(+reservation_id) ?? '';
                    //console.log('Fetched reservation data:', response);
                    setReservationData(response);
                } catch (error) {
                    console.error('Erro ao obter os dados da reserva:', error);
                }
            }
        };

        fetchReservationData();
    }, [reservation_id]);

    // if (!reservationData || !reservationData.hotelier) {
    //     return <div>Loading...</div>;
    // }
    
    // const hotelName = reservationData.hotelier.hotel;
    // const city = reservationData.hotelier.city;
    // const uf = reservationData.hotelier.UF;
    // const street = reservationData.hotelier.address;
    // const nStreet = reservationData.hotelier.n_adress;
    // const cep = reservationData.hotelier.cep;
    


    const navigate = useNavigate();

    const handleSaveReservation = async () => {
        if (!reservationData.id) {
            toast.error('ID da reserva não encontrado.');
            return;
        }

        const saveData: SaveModel = {
            client_id: clientId, 
            reservation_id: reservationData.id
        };

        try {
            await saveReservation(saveData);
            toast.success('Reserva salva com sucesso!');
        } catch (error) {
            toast.error('Erro ao salvar a reserva.');
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
                        backgroundSize="cover" 
                        backgroundPosition="center" 
                        style={{ backgroundImage: `url(http://localhost:5001${reservationData.imageUrl})` }}
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
                        <Divider orientation="vertical" borderColor="#EAEAEA" height="20px" mx={2} />
                        <Icon as={FaPerson} color="#EAEAEA" />
                        {reservationData.people} hóspedes
                    </Text>
                    {/* <VStack align="flex-start" spacing={4}> */}
                        <HStack mt="10px" justify="center" spacing={4}>
                            {reservationData.wifi &&  <ServicesComponent value="Wi-Fi" icon={FaWifi} />}
                            {reservationData.room_service &&  <ServicesComponent value="Serviço de Quarto" icon={FaConciergeBell} />}
                            {reservationData.breakfast &&  <ServicesComponent value="Café da Manhã" icon={FaCoffee} />}
                            {reservationData.airConditioner &&  <ServicesComponent value="Ar-condicionado" icon={FaSnowflake} />}
                            {reservationData.parking &&  <ServicesComponent value="Estacionamento" icon={FaCar} />}
                        </HStack>
                        {/* <HStack align="center" mt="2">
                            <Icon as={FaMapMarkerAlt} color="#eaeaea" />
                            <Text color="#eaeaea">
                                {hotelName}: {street}, {nStreet}, {city} - {uf}, {cep}
                        </Text>
                        </HStack> */}
                    {/* </VStack> */}
                </Box>

                {/* Botões empilhados à direita da imagem de aranha */}
                <VStack
                    position="absolute"
                    left="900px"
                    top="120px"
                    spacing={6}
                >
                    <Button
                        height="50px"
                        width="250px"
                        bg="#6A0572"
                        color="#EAEAEA"
                        border="1px solid #EAEAEA"
                        _hover={{ bg: '#EAEAEA', color: '#6A0572' }}
                        leftIcon={<Icon as={FaCheck} />}
                        onClick={() => navigate(`/create-reservation/${reservationData.id}`)}
                    >
                        Realizar Reserva
                    </Button>
                    <Button
                        height="50px"
                        width="250px"
                        bg="#6A0572"
                        color="#EAEAEA"
                        border="1px solid #EAEAEA"
                        _hover={{ bg: '#EAEAEA', color: '#6A0572' }}
                        leftIcon={<Icon as={FaHeart} />}
                        onClick={handleSaveReservation}
                    >
                        Salvar Reserva
                    </Button>
                    <Button
                        height="50px"
                        width="250px"
                        bg="#6A0572"
                        color="#EAEAEA"
                        border="1px solid #EAEAEA"
                        _hover={{ bg: '#EAEAEA', color: '#6A0572' }}
                        leftIcon={<Icon as={FaShareAlt} />}
                    >
                        Compartilhar Reserva
                    </Button>
                    <Button
                        height="50px"
                        width="250px"
                        bg="#6A0572"
                        color="#EAEAEA"
                        border="1px solid #EAEAEA"
                        _hover={{ bg: '#EAEAEA', color: '#6A0572' }}
                        leftIcon={<Icon as={FaArrowLeft} />}
                        onClick={() => navigate(`/reservations`)}
                    >
                        Voltar
                    </Button>
                </VStack>
            </Box>
            <ToastContainer position="top-right" theme="dark" autoClose={3000} /> {/* Adicione esta linha */}
        </Box>
    );
};

const ServicesComponent: React.FC<{ icon: any; value: string }> = ({ icon, value }) => {
    return (
        <HStack spacing={1}>
            <Icon as={icon} color="#EAEAEA" />
            <Text color="#EAEAEA" fontSize="sm" whiteSpace="nowrap">
                {value}
            </Text>
        </HStack>
    );
}

export default SelectReservation;
