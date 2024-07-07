import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Flex,
    Checkbox,
    Box,
} from '@chakra-ui/react';
import { ArrowBackIcon, CheckIcon } from '@chakra-ui/icons';
import './style.css';
import { Footer, Header, TeiaImg } from '../../Promotion';
import APIService from '../../../../APIService';
import { useNavigate } from 'react-router-dom';

export const PublishedReservation = () => {
    const [name, setName] = useState('');
    const [rooms, setRooms] = useState('');
    const [people, setPeople] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('')
    const [wifi, setWifi] = useState(false);
    const [airConditioner, setAirConditioner] = useState(false);
    const [breakfast, setBreakfast] = useState(false);
    const [parking, setParking] = useState(false);
    const [roomService, setRoomService] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const imagePreview = file ? URL.createObjectURL(file) : ''
        console.log(imagePreview)
        setImageUrl(imagePreview)
        setImage(file);
    }

    const handleDataChange = (setFunction) => event => {
        setFunction(event.target.value);
    }

    const handleCheckboxChange = (setFunction) => (event) => {
        setFunction(event.target.checked);
    };

    const api = new APIService();
    const navigate = useNavigate();

    const handlePublicReservation = async() => {
        if(!image){
            toast.warning('Selecione uma imagem!');
        }else if(name === '' || rooms === '' || people === '' || price === ''){
            toast.warning('Preencha todos os campos!');
        }else{
            try{
                await api.createPublishedReservation(1, name, parseInt(rooms, 10), parseInt(people, 10), wifi, breakfast, airConditioner, parking, roomService, parseFloat(price));
                toast.success('Reserva publicada com sucesso!');
                setTimeout(() => {
                    navigate('/publishedReservationList');
                }, 3000); 
            }catch(error){
                const err = error as { response: { data: { message: string } } };
                toast.error(`${err.response.data.message}`);
            }
        }
    }

    return (
        <Box bg="#191919" minH="100vh" display="flex" flexDirection="column" justifyContent="space-between">
            <Header/>
            <Box mt="30px">
            <Box border="2px solid #eaeaea" borderRadius="5px" p="20px" textAlign="center" mx="auto" maxW="600px" position="relative">
                    <Box fontSize="18px" color="#eaeaea" fontWeight="bold" position="absolute" top="-14px" bg="#191919" px="10px" mx="auto">
                        Dados da Reserva
                    </Box>
                    <Flex justifyContent="space-between">
                        <Box>
                            <Box width="300px" aspectRatio="16/9" bg="#6A0572" display="flex" alignItems="center" justifyContent="center" color="#eaeaea" border="1px dashed #eaeaea" cursor="pointer" position="relative" _hover={{fontWeight: "bold"}}>
                                {imageUrl && <img src={imageUrl} alt="Preview" className='inputPicture' style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>}
                                <Input type='file' accept='image/*' onChange={handleImageChange} opacity="0" position="absolute" width="300px" height="100%" cursor="pointer" aspectRatio="16/9"></Input>
                                <Box display={imageUrl ? "none" : "inline"}>Escolha uma imagem</Box>
                            </Box>
                           
                            <Flex flexDirection="column" mt="25px" gap="5px">
                                <CheckboxComponent value="Wi-fi" checked={wifi} onChange={handleCheckboxChange(setWifi)}/>
                                <CheckboxComponent value="Ar-Condicionado" checked={airConditioner} onChange={handleCheckboxChange(setAirConditioner)}/>
                                <CheckboxComponent value="Café da Manhã" checked={breakfast} onChange={handleCheckboxChange(setBreakfast)}/>
                                <CheckboxComponent value="Estacionamento" checked={parking} onChange={handleCheckboxChange(setParking)}/>
                                <CheckboxComponent value="Serviço de Quarto" checked={roomService} onChange={handleCheckboxChange(setRoomService)}/>
                            </Flex>
                        </Box>
                        <Box>
                            <LabelComponent value="Nome" type="text" input={name} onChange={handleDataChange(setName)}/>
                            <LabelComponent value="Quantidade de Quartos" type="number" input={rooms} onChange={handleDataChange(setRooms)}/>
                            <LabelComponent value="Quantidade de Pessoas" type="number" input={people} onChange={handleDataChange(setPeople)}/>
                            <LabelComponent value="Valor" type="number" input={price} onChange={handleDataChange(setPrice)}/>

                        </Box>
                    </Flex>
                    <Flex justify="space-between" mt="15px">
                        <Button leftIcon={<ArrowBackIcon />} onClick={() => navigate('/publishedReservationList')} border="1px solid white" borderRadius="4px" color="white" bg="transparent" maxW="160px" px="10px" py="10px" fontSize="16px" flex="1" ml="0" mr="10px" _hover={{ bg: "white", color: "#191919" }} fontWeight="none">
                            Voltar
                        </Button>
                        <Button rightIcon={<CheckIcon />} onClick={handlePublicReservation} border="1px solid white" borderRadius="4px" color="white" bg="transparent" maxW="160px" px="10px" py="10px" fontSize="16px" flex="1" ml="10px" mr="0" _hover={{ bg: "white", color: "#191919" }} fontWeight="none">
                            Confirmar
                        </Button>
                    </Flex>
                </Box>
                <TeiaImg />
            </Box>
            <Footer />
            <ToastContainer position="top-right" theme='dark' autoClose={3000}/>
        </Box>);
};

export const CheckboxComponent = ({ value, checked, onChange }) => {
    return (
        <Checkbox color={'#eaeaea'} colorScheme='purple' isChecked={checked} onChange={onChange}>
            {value}
        </Checkbox>
    );
}

export const LabelComponent = ({ value, type, input, onChange }) => {
    return (
        <FormControl mb="15px">
            <FormLabel color="white" mb="8px">{value}</FormLabel>
            <Input isRequired type={type} min={0} value={input} onChange={onChange} bg="#6A0572" color="white" p="10px" borderRadius="4px" border="1px solid #eaeaea" fontSize="16px" />
        </FormControl>
    );
};