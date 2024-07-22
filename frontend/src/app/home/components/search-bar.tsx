import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Flex, Heading, IconButton, Input, Popover, PopoverBody, PopoverContent, PopoverTrigger, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { ISearch } from "../../search/models";

export const SearchBar = () => {

  const [destino, setDestino] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [numAdultos, setNumAdultos] = useState(0);
  const [numCriancas, setNumCriancas] = useState(0);
  const [numRooms, setNumRooms] = useState(0);

  const handleDestino = (event) => {
    setDestino(event.target.value);
  }

  const handleCheckin = (event) => {
    setCheckin(event.target.value);
  }

  const handleCheckout = (event) => {
    setCheckout(event.target.value);
  }

  const searchCorrect = (search: ISearch) => {
    if(search.city.length == 0){
      toast.warning('Preencha todos os campos');
      return false;
    }

    if(new Date(search.checkin) > new Date(search.checkout)){
      toast.warning('Data de checkin posterior a data de checkout');
      return false;
    }

    if(search.num_adults == 0 || search.num_rooms == 0){
      toast.warning('Preencha todos os campos');
      return false;
    }

    return true;
  }


  const handleSearch = async () => {

    const search: ISearch = {
      city: destino,
      checkin,
      checkout,
      num_adults: numAdultos,
      num_children: numCriancas,
      num_rooms: numRooms
    }

    if(searchCorrect(search)){
      window.location.href = `http://localhost:3000/search?city=${destino}&checkin=${checkin}&checkout=${checkout}&num_adults=${numAdultos}&num_children=${numCriancas}&num_rooms=${numRooms}`
    }
  }

  const increaseNumAdultos = () => {
    setNumAdultos(numAdultos + 1);
  }

  const decreaseNumAdultos = () => {
    if(numAdultos > 0){
      setNumAdultos(numAdultos - 1);
    }
  }

  const increaseNumCriancas = () => {
    setNumCriancas(numCriancas + 1);
  }

  const decreaseNumCriancas = () => {
    if(numCriancas > 0){
      setNumCriancas(numCriancas - 1);
    }
  }


  const increaseNumRooms = () => {
    setNumRooms(numRooms + 1);
  }

  const decreaseNumRooms = () => {
    if(numRooms > 0){
      setNumRooms(numRooms - 1);
    }
  }

  return (
    <Flex justify="center" align="center" mb={8} fontFamily="Inter" width="800px">
      <Input
        placeholder="Destino"
        _placeholder={{ opacity: 1, color: 'black.500' }}
        color={"black"}
        textAlign="center"
        variant="outline"
        ml={2}
        height="70px"
        width="130px"
        backgroundColor={"white"}
        borderRadius="0"
        borderLeftRadius="30"
        onChange={handleDestino}
        fontFamily="Inter"
        data-cy="destino"
      />
      <Input
        placeholder="Check-in"
        _placeholder={{ opacity: 1, color: 'black.500' }}
        type="date"
        variant="outline"
        height="70px"
        width="180px"
        backgroundColor={"white"}
        color={"black"}
        borderRadius="0"
        // defaultValue={(new Date()).toISOString().split('T')[0].split('-').reverse().join('/')}
        onChange={handleCheckin}
        fontFamily="Inter"
        data-cy="checkin"
      />
      <Input
        placeholder="Check-out"
        _placeholder={{ opacity: 1, color: 'black.500' }}
        type="date"
        variant="outline"
        height="70px"
        width="180px"
        backgroundColor={"white"}
        color={"black"}
        borderRadius="0"
        onChange={handleCheckout}
        fontFamily="Inter"
        data-cy="checkout"
      />
      <Popover id="detalhes" >
        <PopoverTrigger>
          <Input
          placeholder="Detalhes"
          _placeholder={{ opacity: 1, color: 'black.500' }}
          variant="outline"
          height="70px"
          width="130px"
          textAlign={"center"}
          backgroundColor={"white"}
          borderRadius="0"
          fontFamily="Inter"
          data-cy="detalhes"
        />  
        </PopoverTrigger>
        <PopoverContent borderRadius="0">
          <PopoverBody backgroundColor={'#191919'} color={'white'}>
            <Flex justify="center" align="center" mt={4} mb={4}>
              <Heading as='h3' size='md' mr={5} fontFamily="Inter" width="90px">
                Adultos
              </Heading>
              <IconButton
                aria-label="less"
                icon={<MinusIcon />}
                mx={2}
                isDisabled={numAdultos == 0}
                height="25px"
                width="25px"
                onClick={decreaseNumAdultos}
                data-cy="less_adultos"
              />
              <Text mx={1} fontSize={'lg'}>{numAdultos}</Text>
              <IconButton
                aria-label="increase"
                icon={<AddIcon />}
                mx={2}
                height="25px"
                width="25px"
                onClick={increaseNumAdultos}
                data-cy="increase_adultos"
              />
            </ Flex>
            <Flex justify="center" align="center" mt={4} mb={4}>
              <Heading as='h4' size='md' mr={5} fontFamily="Inter" width="90px">
                Crianças
              </Heading>
              <IconButton
                aria-label="less"
                icon={<MinusIcon />}
                mx={2}
                isDisabled={numCriancas == 0}
                height="25px"
                width="25px"
                onClick={decreaseNumCriancas}
                data-cy="less_criancas"
              />
              <Text mx={1} fontSize={'lg'}>{numCriancas}</Text>
              <IconButton
                aria-label="increase"
                icon={<AddIcon />}
                mx={2}
                height="25px"
                width="25px"
                onClick={increaseNumCriancas}
                data-cy="increase_criancas"
              />
            </ Flex>
            <Flex justify="center" align="center" mt={4} mb={4}>
              <Heading as='h3' size='md' mr={5} fontFamily="Inter" width="90px">
                Quartos
              </Heading>
              <IconButton
                aria-label="less"
                icon={<MinusIcon />}
                mx={2}
                isDisabled={numRooms == 0}
                height="25px"
                width="25px"
                onClick={decreaseNumRooms}
                data-cy="less_quartos"
              />
              <Text mx={1} fontSize={'lg'}>{numRooms}</Text>
              <IconButton
                aria-label="increase"
                icon={<AddIcon />}
                mx={2}
                height="25px"
                width="25px"
                onClick={increaseNumRooms}
                data-cy="increase_quartos"
              />
            </ Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <IconButton
        aria-label="Search"
        icon={<FaSearch />}
        height="70px"
        width="70px"
        bg="white"
        colorScheme="red"
        color="red"
        onClick={() => (handleSearch())}
        borderRadius="0"
        borderRightRadius="30"
        _hover={{color: "white", bgColor:"red"}}
        data-cy="pesquisar"
      />
      <ToastContainer theme="dark"/>
    </Flex>
  );
};
