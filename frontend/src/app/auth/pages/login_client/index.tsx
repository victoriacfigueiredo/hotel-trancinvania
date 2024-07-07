import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Link,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { NavBar } from "../../../../shared/components/nav-bar";
import { BottomLeftTopRightImages } from "../../../../shared/components/spider-images";

const moonImage = "https://i.imgur.com/QxLtz78.png";

const LoginSchema = z.object({
  username: z.string().nonempty("Username é obrigatório"),
  password: z.string().nonempty("Senha é obrigatória"),
});

type LoginFormInputs = z.infer<typeof LoginSchema>;

const LoginClient: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginSchema),
  });
  const toast = useToast();

  const onSubmit = (data: LoginFormInputs) => {
    toast({
      title: "Login bem-sucedido!",
      description: `Bem-vindo, ${data.username}!`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box bg="#191919" color="white" minH="100vh" fontFamily="Inter, sans-serif">
      <NavBar />
      <BottomLeftTopRightImages />
      <Container maxW="container.md" position="relative" zIndex={1}>
        <Flex direction="column" align="center" justify="center" mt={10}>
          <HStack alignItems={"flex-start"} mb={8}>
            <Image
              src={moonImage}
              alt="Login Icon"
              width="79.5px"
              height="69.8px"
              mr={3}
            />
            <Text fontFamily="Trancinfont" fontSize="5xl">
              LOGIN
            </Text>
          </HStack>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <VStack spacing={10} alignItems={"center"}>
              <VStack width={"100%"} spacing={4}>
                <FormControl isInvalid={!!errors.username} maxWidth="400px">
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
                <FormControl isInvalid={!!errors.password} maxWidth="400px">
                  <FormLabel htmlFor="password">Senha</FormLabel>
                  <Input
                    id="password"
                    alignSelf={"center"}
                    type="password"
                    placeholder="Senha"
                    {...register("password")}
                  />
                  {errors.password && (
                    <Text color="red.500">{errors.password.message}</Text>
                  )}
                </FormControl>
              </VStack>
              <ButtonGroup spacing={4}>
                <Button type="submit" colorScheme="red" fontWeight={200}>
                  Entrar
                </Button>
                <Button
                  variant="outline"
                  borderColor="red.500"
                  fontWeight={200}
                  color={"white"}
                  _hover={{
                    bg: "red.500",
                    color: "white",
                  }}
                >
                  Esqueci a Senha
                </Button>
              </ButtonGroup>
            </VStack>
          </form>
          <Box textAlign="left" mt={6}>
            <Text>
              Ainda não possui conta? <br />
              Cadastre-se como{" "}
              <Link color="#0097B2" fontWeight={800}>
                Cliente
              </Link>
              , para fazer reservas incríveis.
              <br />
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default LoginClient;
