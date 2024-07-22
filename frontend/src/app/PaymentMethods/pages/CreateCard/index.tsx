import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  HStack,
} from '@chakra-ui/react';

function CadastrarCartao() {
  return (
    <Box
      bg="black"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bg="gray.900"
        p={6}
        borderRadius="md"
        width={{ base: '90%', md: '400px' }}
        color="white"
      >
        <Box textAlign="center" mb={6}>
          <FormLabel fontSize="2xl">Cadastrar Cartão</FormLabel>
        </Box>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Apelido do Cartão</FormLabel>
            <Input bg="purple.800" placeholder="Apelido do Cartão" />
          </FormControl>
          <FormControl>
            <FormLabel>Número do Cartão</FormLabel>
            <HStack>
              <Input bg="purple.800" placeholder="Número do Cartão" />
              <Input bg="purple.800" placeholder="CVV" width="100px" />
            </HStack>
          </FormControl>
          <FormControl>
            <FormLabel>CPF</FormLabel>
            <Input bg="purple.800" placeholder="CPF" />
          </FormControl>
          <FormControl>
            <FormLabel>Validade</FormLabel>
            <Input bg="purple.800" placeholder="Validade" />
          </FormControl>
          <FormControl>
            <FormLabel>Tipo</FormLabel>
            <Select bg="purple.800" placeholder="Selecione o tipo">
              <option value="credit">Crédito</option>
              <option value="debit">Débito</option>
            </Select>
          </FormControl>
          <HStack spacing={4} pt={4}>
            <Button colorScheme="red">Cancelar</Button>
            <Button colorScheme="green">Confirmar</Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}

export default CadastrarCartao;
