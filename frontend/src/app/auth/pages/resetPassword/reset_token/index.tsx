import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BottomLeftTopRightImages } from "../../../../../shared/components/spider-images";
import { NavBar } from "../../../../../shared/components/nav-bar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  RecoveryFormInputs,
  RecoverySchema,
} from "../../../forms/recoveryForm";
import { useNavigate } from "react-router-dom";

const wizardImage = "https://i.imgur.com/En0qPaO.png";
const booImage = "https://i.imgur.com/1oLAmzY.png";

export const ResetToken: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoveryFormInputs>({
    resolver: zodResolver(RecoverySchema),
  });

  const onSubmit = () => {
    toast.success(
      "Token enviado para o seu e-mail! Verifique sua caixa de entrada."
    );
  };
  const handleSendEmailAgainClick = () => {
    navigate("/password/recover");
  };
  return (
    <Box bg="#191919" color="white" minH="100vh" fontFamily="Inter, sans-serif">
      <NavBar />
      <BottomLeftTopRightImages />
      <Flex align="center" justify="center" minH="calc(100vh - 80px)">
        <Flex position="relative" alignItems="flex-end">
          <Container maxW="container.md" position="relative" zIndex={1}>
            <Flex direction="column" align="center" justify="center">
              <HStack alignItems={"flex-start"} mb={5}>
                <Image
                  src={booImage}
                  alt="Reset Password Icon"
                  width="auto"
                  height="90px"
                  mr={3}
                />
                <Text
                  fontFamily="Trancinfont"
                  fontSize="7xl"
                  letterSpacing={"-0.07em"}
                >
                  recuperação de Senha
                </Text>
              </HStack>
              <Text fontSize={"20px"} fontWeight={"300"} mb={4}>
                Não se assuste! Cole abaixo o token que
                <br />
                você recebeu por e-mail e escolha sua
                <br />
                nova senha.
              </Text>
              <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                <Flex
                  direction="column"
                  align="flex-start"
                  mx="auto"
                  maxWidth="400px"
                >
                  <FormControl
                    isInvalid={!!errors.email}
                    mb={1}
                    mt={6}
                    maxWidth="400px"
                  >
                    <FormLabel htmlFor="email">Token</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Digite seu Token"
                      {...register("email")}
                    />
                    <FormErrorMessage>
                      {errors.email && errors.email.message}
                    </FormErrorMessage>
                  </FormControl>
                  <ButtonGroup spacing={4}>
                    <Button mt={6} colorScheme="red" bg="#A4161A" type="submit">
                      Continuar
                    </Button>
                    <Button
                      mt={6}
                      colorScheme="red"
                      type="submit"
                      variant="outline"
                      borderColor="red.500"
                      color={"white"}
                      _hover={{
                        bg: "transparent",
                        color: "red.500",
                        //borderColor: "#FAC006",
                      }}
                      onClick={handleSendEmailAgainClick}
                    >
                      Enviar novamente
                    </Button>
                  </ButtonGroup>
                </Flex>
              </form>
            </Flex>
          </Container>
          <Image
            src={wizardImage}
            alt="Feiticeiro"
            position="absolute"
            bottom="0"
            right="-300px" // Adjust this value to position the ghost correctly
            width="auto"
            height="480px"
            display={{ base: "none", md: "block" }}
          />
        </Flex>
      </Flex>
    </Box>
  );
};
