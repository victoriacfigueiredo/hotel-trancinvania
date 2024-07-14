import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
  SimpleGrid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useRegisterClientMutation } from "../../../hooks";
import {
  RegisterClientFormInputs,
  RegisterClientSchema,
} from "../../../forms/RegisterForm";
import { BottomLeftTopRightImages } from "../../../../../shared/components/spider-images";
import { NavBar } from "../../../../../shared/components/nav-bar";

const RegisterClient: React.FC = () => {
  const navigate = useNavigate();
  const registerClientMutation = useRegisterClientMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterClientFormInputs & { passwordConfirmation: string }>({
    resolver: zodResolver(RegisterClientSchema),
  });
  const toast = useToast();

  const onSubmit = async (data: RegisterClientFormInputs) => {
    try {
      await registerClientMutation.mutateAsync(data);
      toast({
        title: "Cadastro bem-sucedido!",
        description: `Bem-vindo, ${data.username}!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/client/login");
    } catch (error: any) {
      toast({
        title: "Erro no cadastro",
        description: error.response?.data?.message || "Erro desconhecido",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="#191919" color="white" minH="100vh" fontFamily="Inter, sans-serif">
      <NavBar />
      <BottomLeftTopRightImages />
      <Flex align="center" justify="center" minH="calc(100vh - 80px)">
        <Container maxW="container.md">
          <Flex direction="column" align="center" justify="center">
            <HStack alignItems={"flex-start"} mb={1}>
              <Text
                fontFamily="Trancinfont"
                fontSize="6xl"
                letterSpacing={"-0.07em"}
              >
                CadasTro de clienTe
              </Text>
            </HStack>
            <Text fontWeight={200}>
              Monstro ou humano, te damos as boas-vindas. Faça já seu cadastro.
            </Text>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <VStack spacing={10} alignItems={"flex-start"}>
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  spacing={6}
                  width="100%"
                >
                  <GridItem colSpan={1}>
                    <FormControl isInvalid={!!errors.name}>
                      <FormLabel htmlFor="name">Nome</FormLabel>
                      <Input
                        id="name"
                        placeholder="Nome Completo"
                        {...register("name")}
                      />
                      {errors.name && (
                        <Text color="red.500">{errors.name.message}</Text>
                      )}
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl isInvalid={!!errors.email}>
                      <FormLabel htmlFor="email">E-mail</FormLabel>
                      <Input
                        id="email"
                        placeholder="Digite seu e-mail"
                        {...register("email")}
                      />
                      {errors.email && (
                        <Text color="red.500">{errors.email.message}</Text>
                      )}
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl isInvalid={!!errors.username}>
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <Input
                        id="username"
                        placeholder="Username"
                        {...register("username")}
                      />
                      {errors.username && (
                        <Text color="red.500">{errors.username.message}</Text>
                      )}
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl isInvalid={!!errors.cpf}>
                      <FormLabel htmlFor="cpf">CPF</FormLabel>
                      <Input id="cpf" placeholder="CPF" {...register("cpf")} />
                      {errors.cpf && (
                        <Text color="red.500">{errors.cpf.message}</Text>
                      )}
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl isInvalid={!!errors.phone}>
                      <FormLabel htmlFor="phone">Número de Telefone</FormLabel>
                      <Input
                        id="phone"
                        placeholder="(XX) XXXXX-XXXX"
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <Text color="red.500">{errors.phone.message}</Text>
                      )}
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl isInvalid={!!errors.birthDate}>
                      <FormLabel htmlFor="birthDate">
                        Data de Nascimento
                      </FormLabel>
                      <Input
                        id="birthDate"
                        placeholder="Data de Nascimento"
                        {...register("birthDate")}
                      />
                      {errors.birthDate && (
                        <Text color="red.500">{errors.birthDate.message}</Text>
                      )}
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl isInvalid={!!errors.password}>
                      <FormLabel htmlFor="password">Senha</FormLabel>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Senha"
                        {...register("password")}
                      />
                      {errors.password && (
                        <Text color="red.500">{errors.password.message}</Text>
                      )}
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl isInvalid={!!errors.passwordConfirmation}>
                      <FormLabel htmlFor="passwordConfirmation">
                        Confirmação de Senha
                      </FormLabel>
                      <Input
                        id="passwordConfirmation"
                        type="password"
                        placeholder="Confirmação de Senha"
                        {...register("passwordConfirmation")}
                      />
                      {errors.passwordConfirmation && (
                        <Text color="red.500">
                          {errors.passwordConfirmation.message}
                        </Text>
                      )}
                    </FormControl>
                  </GridItem>
                </SimpleGrid>
                <Button
                  type="submit"
                  colorScheme="red"
                  fontWeight={400}
                  bg="#A4161A"
                >
                  Confirmar Cadastro
                </Button>
              </VStack>
            </form>
          </Flex>
        </Container>
      </Flex>
    </Box>
  );
};

export default RegisterClient;
