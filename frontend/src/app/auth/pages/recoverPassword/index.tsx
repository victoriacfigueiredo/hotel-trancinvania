import { Box, Button, Container, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Image, Input, Text, useToast} from "@chakra-ui/react";
import React from "react";
import { NavBar } from "../../../../shared/components/nav-bar";
import { BottomLeftTopRightImages } from "../../../../shared/components/spider-images";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecoveryFormInputs, RecoverySchema } from "../../forms/recoveryForm";
import "react-toastify/dist/ReactToastify.css";
const keyImage = "https://i.imgur.com/5GmX6rc.png";


export const recoverPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoveryFormInputs>({
    resolver: zodResolver(RecoverySchema),
  });
  const toast = useToast();

  const onSubmit = () => {
    toast({
      //title: "Token enviado para o seu e-mail!",
      description: "Verifique sua caixa de entrada.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box bg="#191919" color="white" minH="100vh" fontFamily="Inter, sans-serif">
      <NavBar />
      <BottomLeftTopRightImages />
      <Container maxW="container.md" position="relative" zIndex={1} mt={6}>
        <Flex direction="column" align="center" justify="center">
          <HStack alignItems={"flex-start"} mb={5}>
            <Image
              src={keyImage}
              alt="Recover Password Icon"
              width="auto"
              height="90px"
              mr={3}
            />
            <Text fontFamily="Trancinfont" fontSize="7xl" letterSpacing={"-0.07em"}>
              recuperação de Senha
            </Text>
          </HStack>
          <Text fontSize={"24.5px"} fontWeight={"300"} mb={4}>
            Esqueceu sua senha? Digite o e-mail que você<br />cadastrou no campo abaixo e te enviaremos um<br />token para recuperá-la.
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.email} mb={4}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                {...register("email")}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <Button mt={4} colorScheme="red" type="submit">
              Enviar
            </Button>
          </form>
        </Flex>
      </Container>
    </Box>
  );
};