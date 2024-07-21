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
      />
      <Popover>
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
        />  
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody backgroundColor={'#191919'} color={'white'}>
            <Flex justify="center" align="center" mt={4} mb={4}>
              <Heading as='h3' size='lg' mr={5}>
                Adultos
              </Heading>
              <IconButton
                aria-label="less"
                icon={<MinusIcon />}
                mx={2}
                isDisabled={numAdultos == 0}
                height="35px"
                width="35px"
                onClick={decreaseNumAdultos}
              />
              <Text mx={1} fontSize={'xl'}>{numAdultos}</Text>
              <IconButton
                aria-label="increase"
                icon={<AddIcon />}
                mx={2}
                height="35px"
                width="35px"
                onClick={increaseNumAdultos}
              />
            </ Flex>
            <Flex justify="center" align="center" mt={4} mb={4}>
              <Heading as='h3' size='lg' mr={5}>
                Crianças
              </Heading>
              <IconButton
                aria-label="less"
                icon={<MinusIcon />}
                mx={2}
                isDisabled={numCriancas == 0}
                height="35px"
                width="35px"
                onClick={decreaseNumCriancas}
              />
              <Text mx={1} fontSize={'xl'}>{numCriancas}</Text>
              <IconButton
                aria-label="increase"
                icon={<AddIcon />}
                mx={2}
                height="35px"
                width="35px"
                onClick={increaseNumCriancas}
              />
            </ Flex>
            <Flex justify="center" align="center" mt={4} mb={4}>
              <Heading as='h3' size='lg' mr={5}>
                Quartos
              </Heading>
              <IconButton
                aria-label="less"
                icon={<MinusIcon />}
                mx={2}
                isDisabled={numRooms == 0}
                height="35px"
                width="35px"
                onClick={decreaseNumRooms}
              />
              <Text mx={1} fontSize={'xl'}>{numRooms}</Text>
              <IconButton
                aria-label="increase"
                icon={<AddIcon />}
                mx={2}
                height="35px"
                width="35px"
                onClick={increaseNumRooms}
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
      />
      <ToastContainer theme="dark"/>
    </Flex>
  );
};
