import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { NavBar } from '../../../../shared/components/nav-bar';
import { colors } from '../../../PaymentMethods/models/colors'; // Importe o arquivo de cores

// Função simulada para buscar dados dos cartões
const fetchCartoes = async () => {
  // Simulando uma requisição ao servidor
  return [
    { id: 1, apelido: 'Cartão Roxo', cor: 'purple.500', bandeira: 'Visa', numero: '1234567812341234', nome: 'JOSE G DA SILVA' },
    { id: 2, apelido: 'Cartão Vermelho', cor: 'red.500', bandeira: 'Visa', numero: '1234567812345678', nome: 'JOSE G DA SILVA' },
    { id: 3, apelido: 'Cartão Preto', cor: 'black', bandeira: 'Mastercard', numero: '1234567812349999', nome: 'JOSE G DA SILVA' },
  ];
};

const CartaoItem = ({ cartao, selecionado, onClick }) => (
  <Box
    onClick={onClick}
    bg={selecionado ? colors.cardHoverBackground : colors.cardBackground}
    p={4}
    borderRadius="md"
    cursor="pointer"
    display="flex"
    alignItems="center"
    width="100%"
    borderWidth={selecionado ? 2 : 1}
    borderColor={selecionado ? colors.cardBorderSelected : colors.cardBorder}
  >
    <Box bg={cartao.cor} width="80px" height="30px" mr={4} />
    <Box>
      <Text fontSize="sm">Cartão de crédito terminando em **** {cartao.numero.slice(-4)}</Text>
    </Box>
  </Box>
);

const CartaoDetalhes = ({ cartao, onDelete }) => (
  <Box bg="#EAEAEA" p={6} borderRadius="md" boxShadow="md" width={{ base: '100%', md: '500px' }} mt={{ base: 4, md: 0 }}>
    <Box
      bg={cartao.cor}
      height="250px"
      borderRadius="md"
      mb={4}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      color="white"
      position="relative"
    >
      <Text
        fontWeight="bold"
        fontSize="lg"
        position="absolute"
        top={4}
        left={4}
      >
        {cartao.bandeira}
      </Text>
      <Text
        fontSize="md"
        position="absolute"
        bottom={4}
        right={4}
      >
        **** {cartao.numero.slice(-4)}
      </Text>
      <Text
        position="absolute"
        bottom={4}
        left={4}
        mb={2}
      >
        {cartao.nome}
      </Text>
    </Box>
    <HStack justify="center" spacing={4}>
      <Button variant="link" colorScheme={colors.buttonTextEdit}>Editar</Button>
      <Button variant="link" colorScheme={colors.buttonTextDelete} onClick={onDelete}>Excluir</Button>
    </HStack>
  </Box>
);

const Cartoes: React.FC = () => {
  const [cartoes, setCartoes] = useState([]);
  const [cartaoSelecionado, setCartaoSelecionado] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const cartoesData = await fetchCartoes();
      setCartoes(cartoesData);
      if (cartoesData.length > 0) {
        setCartaoSelecionado(cartoesData[0]);
      }
    };

    fetchData();
  }, []);

  const handleAddCartao = () => {
    const novoCartao = {
      id: cartoes.length + 1,
      apelido: `Cartão ${cartoes.length + 1}`,
      cor: 'gray.500',
      bandeira: 'NovoCartao',
      numero: '0000000000000000',
      nome: 'JOSE G DA SILVA'
    };
    setCartoes([...cartoes, novoCartao]);
  };

  const handleDeleteCartao = (cartaoId) => {
    setCartoes(cartoes.filter(cartao => cartao.id !== cartaoId));
    if (cartaoSelecionado.id === cartaoId) {
      setCartaoSelecionado(null);
    }
  };

  return (
    <Box bg={colors.background} minH="100vh" color={colors.text} display="flex" flexDirection="column" alignItems="center">
      <Box width="100%">
        <NavBar />
      </Box>
      <Flex
        justifyContent="center"
        alignItems="center"
        mt={12}
        px={6}
        flexDirection="row"
        maxW="1200px"
        width="100%"
        direction={{ base: 'column', md: 'row' }}
        align="flex-start"
      >
        <Flex
          flexDirection="row"
          alignItems="flex-start"
          width="100%"
          maxW="1200px"
          justifyContent="center"
        >
          <Flex flexDirection="column" alignItems="center" width={{ base: '100%', md: '300px' }} mr={{ base: 0, md: 4 }}>
            <Box
              bg={colors.background}
              p={4}
              borderRadius="md"
              mb={4}
              width="100%"
              maxH="200px"
              overflowY="auto"
              boxShadow="md"
            >
              <Text fontSize="4xl" mb={4} fontWeight="bold" color={colors.title}>Carteira</Text>
              <Text mb={4} color={colors.title}>Cartões Cadastrados</Text>
            </Box>
            <Box
              bg={colors.cardBackground}
              p={4}
              borderRadius="md"
              mb={4}
              width="100%"
              maxH="500px"
              overflowY="auto"
              boxShadow="md"
            >
              <VStack spacing={4} align="stretch">
                {cartoes.map(cartao => (
                  <CartaoItem
                    key={cartao.id}
                    cartao={cartao}
                    selecionado={cartaoSelecionado && cartao.id === cartaoSelecionado.id}
                    onClick={() => setCartaoSelecionado(cartao)}
                  />
                ))}
                <Box
                  onClick={handleAddCartao}
                  bg={colors.addCardBackground}
                  p={4}
                  borderRadius="md"
                  cursor="pointer"
                  width="100%"
                  textAlign="center"
                  border={`1px dashed ${colors.addCardBorder}`}
                >
                  <IconButton icon={<AddIcon />} aria-label="Adicionar novo cartão" />
                  <Text>Adicione um método de pagamento</Text>
                </Box>
              </VStack>
            </Box>
          </Flex>
          {cartaoSelecionado && (
            <Box ml={{ base: 0, md: 4 }} mt={{ base: 4, md: 0 }} width={{ base: '100%', md: '500px' }} display="flex" alignItems="center">
              <CartaoDetalhes
                cartao={cartaoSelecionado}
                onDelete={() => handleDeleteCartao(cartaoSelecionado.id)}
              />
            </Box>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Cartoes;
