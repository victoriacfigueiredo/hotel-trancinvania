import React, { useEffect, useState } from 'react';
import { getPayMethodsByClient, deletePayMethodsById } from '../../services';
import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  IconButton,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { NavBar } from '../../../../shared/components/nav-bar';
import { colors } from '../../../PaymentMethods/models/colors';
import { CardModel } from '../../models/card';

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
    <Box bg={colors.cardBackground} width="80px" height="30px" mr={4} />
    <Box>
      <Text fontSize="sm">Cartão de crédito terminando em **** {cartao.numCard ? cartao.numCard.slice(-4) : 'Número desconhecido'}</Text>
    </Box>
  </Box>
);

const CartaoDetalhes = ({ cartao, onDelete }) => {
  if (!cartao) {
    return null;
  }

  const { name, numCard, type } = cartao;

  return (
    <Box bg="#EAEAEA" p={6} borderRadius="md" boxShadow="md" width={{ base: '100%', md: '500px' }} mt={{ base: 4, md: 0 }}>
      <Box
        bg={colors.cardBackground}
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
          {type || 'Tipo desconhecido'}
        </Text>
        <Text
          fontSize="md"
          position="absolute"
          bottom={4}
          right={4}
        >
          **** {numCard ? numCard.slice(-4) : 'Número desconhecido'}
        </Text>
        <Text
          position="absolute"
          bottom={4}
          left={4}
          mb={2}
        >
          {name || 'Nome desconhecido'}
        </Text>
      </Box>
      <HStack justify="center" spacing={4}>
        <Button variant="link" colorScheme={colors.buttonTextEdit}>Editar</Button>
        <Button variant="link" colorScheme={colors.buttonTextDelete} onClick={onDelete}>Excluir</Button>
      </HStack>
    </Box>
  );
};

const Cartoes = () => {
  const [cartoes, setCartoes] = useState<CardModel[]>([]);
  const [cartaoSelecionado, setCartaoSelecionado] = useState<CardModel | null>(null);
  const clientId = 7; // Substitua isso pelo método real de obter o clientId
  const toast = useToast(); // Inicialize o useToast

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const cartoesData: CardModel[] = await getPayMethodsByClient(clientId);
        setCartoes(cartoesData);
        if (cartoesData.length > 0) {
          setCartaoSelecionado(cartoesData[0]);
        }
      } catch (error) {
        console.error('Erro ao buscar cartões:', error);
      }
    };

    if (clientId) {
      fetchCard();
    }
  }, [clientId]);

  const handleAddCartao = () => {
    const novoCartao: CardModel = {
      id: cartoes.length + 1,
      name: `Cartão ${cartoes.length + 1}`,
      numCard: '0000000000000000',
      cvv: 123,
      expiryDate: '12/25',
      type: 'NovoCartao',
      clientId: clientId,
      cpf: '000.000.000-00'
    };
    setCartoes([...cartoes, novoCartao]);
  };

  const handleDeleteCartao = async (cartaoId: number) => {
    try {
      await deletePayMethodsById(clientId, cartaoId);
      setCartoes(cartoes.filter(cartao => cartao.id !== cartaoId));
      if (cartaoSelecionado && cartaoSelecionado.id === cartaoId) {
        setCartaoSelecionado(null);
      }
      toast({
        title: 'Cartão excluído com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
        containerStyle: {
          backgroundColor: '#A4161A',
          color: '#EAEAEA',
        }
      });
    } catch (error) {
      console.error('Erro ao deletar o cartão:', error);
    }
  };

  return (
    <Box bg={colors.background} minH="100vh" color={colors.text} display="flex" flexDirection="column" alignItems="center">
      <Box width="100%">
        <NavBar />
      </Box>
      <Flex
        justifyContent="center"
        alignItems="flex-start"
        mt={12}
        px={6}
        flexDirection={{ base: 'column', md: 'row' }}
        width="100%"
        maxW="1200px"
        direction={{ base: 'column', md: 'row' }}
        gap={4}
      >
        <Flex
          flexDirection="column"
          alignItems="center"
          width={{ base: '100%', md: '300px' }}
          mb={{ base: 4, md: 0 }}
        >
          <Box
            bg={colors.background}
            p={4}
            borderRadius="md"
            mb={4}
            width="100%"
            maxH="200px"
            overflowY="auto"
            boxShadow="md"
            textAlign="center"
          >
            <Text fontSize={{ base: '2xl', md: '4xl' }} mb={4} fontWeight="bold" color={colors.title}>Carteira</Text>
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
            textAlign="center"
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
          <Box width={{ base: '100%', md: '500px' }} display="flex" justifyContent="center">
            <CartaoDetalhes
              cartao={cartaoSelecionado}
              onDelete={() => handleDeleteCartao(cartaoSelecionado.id)}
            />
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Cartoes;
