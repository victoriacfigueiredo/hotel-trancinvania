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
  Image,
  useSteps,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useToast,
  ButtonGroup,
  Progress,
} from "@chakra-ui/react";
import InputMask from "react-input-mask";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useRegisterHotelierMutation } from "../../../hooks";
import {
  RegisterHotelierFormInputs,
  RegisterHotelierSchema,
} from "../../../forms/register-form";
import { BottomLeftTopRightImages } from "../../../../../shared/components/spider-images";
import { NavBar } from "../../../../../shared/components/nav-bar";
import "react-toastify/dist/ReactToastify.css";

const tombstoneImage = "https://i.imgur.com/yLVjxc0.png";
const witchImage = "https://i.imgur.com/2GXn2sj.png";

const steps = [{ title: "Seus Dados" }, { title: "Dados do Hotel" }];

const RegisterHotelier: React.FC = () => {
  const { activeStep, setActiveStep } = useSteps();
  const navigate = useNavigate();
  const registerHotelierMutation = useRegisterHotelierMutation();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<RegisterHotelierFormInputs>({
    resolver: zodResolver(RegisterHotelierSchema),
  });

  const onSubmit = async (data: RegisterHotelierFormInputs) => {
    try {
      await registerHotelierMutation.mutateAsync(data);
      toast({
        title: "Cadastro bem-sucedido!",
        description: `Bem-vindo, ${data.username}!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/hotelier/login");
      }, 3000);
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      toast({
        title: "Erro no cadastro",
        description: error.response?.data?.message || "Erro desconhecido",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleCepBlur = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${cleanCep}/json/`
        );
        const data = await response.json();
        if (!data.erro) {
          setValue("address", data.logradouro);
          setValue("city", data.localidade);
          setValue("UF", data.uf);
        } else {
          toast({
            title: "Erro",
            description: "CEP não encontrado.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
        toast({
          title: "Erro",
          description: "Erro ao buscar o CEP.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const progress = ((activeStep + 1) / steps.length) * 100;

  return (
    <Box bg="#191919" color="white" minH="100vh" fontFamily="Inter, sans-serif">
      <NavBar />
      <BottomLeftTopRightImages />
      <Flex align="center" justify="center" minH="calc(100vh - 80px)">
        <Container maxW="container.md">
          <Flex
            direction={{ base: "column", lg: "row" }}
            align={{ base: "center", lg: "flex-start" }}
            justify="space-between"
            w="100%"
          >
            <Flex
              direction="column"
              align="flex-start"
              justify="center"
              w={{ base: "100%", lg: "75%" }}
              ml={{ base: "0", lg: "-20%" }}
            >
              <HStack alignItems={"flex-start"} mb={1} mt={-18}>
                <Text
                  fontFamily="Trancinfont"
                  fontSize="6xl"
                  letterSpacing={"-0.07em"}
                >
                  CadasTro de hoTeleiro
                </Text>
              </HStack>
              <Text fontWeight={200} mb={5}>
                Tem um hotel para monstros ou humanos? Cadastre-o conosco e seja
                bem-vindo ao Hotel Trancinvânia!
              </Text>
              <Box position="relative">
                <Stepper index={activeStep}>
                  {steps.map((step, index) => (
                    <Step key={index}>
                      <StepIndicator>
                        <StepStatus
                          complete={<StepIcon />}
                          incomplete={<StepNumber />}
                          active={<StepNumber />}
                        />
                      </StepIndicator>
                      <Box flexShrink="0">
                        <StepTitle>{step.title}</StepTitle>
                      </Box>
                      <StepSeparator />
                    </Step>
                  ))}
                </Stepper>
                <Progress
                  value={progress}
                  position="absolute"
                  height="3px"
                  width="full"
                  top="10px"
                  zIndex={-1}
                />
              </Box>
              <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                {activeStep === 0 && (
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
                            maxW={{ base: "100%", md: "300px" }}
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
                            maxW={{ base: "100%", md: "300px" }}
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
                            maxW={{ base: "100%", md: "300px" }}
                          />
                          {errors.username && (
                            <Text color="red.500">
                              {errors.username.message}
                            </Text>
                          )}
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl isInvalid={!!errors.password}>
                          <FormLabel htmlFor="password">Senha</FormLabel>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Digite sua senha"
                            {...register("password")}
                            maxW={{ base: "100%", md: "300px" }}
                          />
                          {errors.password && (
                            <Text color="red.500">
                              {errors.password.message}
                            </Text>
                          )}
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl isInvalid={!!errors.confirmPassword}>
                          <FormLabel htmlFor="confirmPassword">
                            Confirmação de Senha
                          </FormLabel>
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Digite a senha novamente"
                            {...register("confirmPassword")}
                            maxW={{ base: "100%", md: "300px" }}
                          />
                          {errors.confirmPassword && (
                            <Text color="red.500">
                              {errors.confirmPassword.message}
                            </Text>
                          )}
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <Flex
                          justify="flex-start"
                          w="full"
                          h="full"
                          align="flex-end"
                        >
                          <Button
                            onClick={handleNext}
                            colorScheme="red"
                            fontWeight={400}
                            bg="#A4161A"
                          >
                            Continuar
                          </Button>
                        </Flex>
                      </GridItem>
                    </SimpleGrid>
                  </VStack>
                )}
                {activeStep === 1 && (
                  <VStack spacing={10} alignItems={"flex-start"}>
                    <SimpleGrid
                      columns={{ base: 1, md: 2 }}
                      spacing={6}
                      width="100%"
                    >
                      <GridItem colSpan={1}>
                        <FormControl isInvalid={!!errors.hotel}>
                          <FormLabel htmlFor="hotel">Nome do Hotel</FormLabel>
                          <Input
                            id="hotel"
                            placeholder="Nome do Hotel"
                            {...register("hotel")}
                            maxW={{ base: "100%", md: "300px" }}
                          />
                          {errors.hotel && (
                            <Text color="red.500">{errors.hotel.message}</Text>
                          )}
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl isInvalid={!!errors.cep}>
                          <FormLabel htmlFor="cep">CEP</FormLabel>
                          <Controller
                            name="cep"
                            control={control}
                            render={({ field }) => (
                              <Input
                                as={InputMask}
                                mask="99999-999"
                                id="cep"
                                placeholder="00000-000"
                                {...field}
                                maxW={{ base: "100%", md: "300px" }}
                                onBlur={(e) => handleCepBlur(e.target.value)}
                              />
                            )}
                          />
                          {errors.cep && (
                            <Text color="red.500">{errors.cep.message}</Text>
                          )}
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl isInvalid={!!errors.address}>
                          <FormLabel htmlFor="address">Endereço</FormLabel>
                          <Input
                            id="address"
                            placeholder="Endereço do Hotel"
                            {...register("address")}
                            maxW={{ base: "100%", md: "300px" }}
                          />
                          {errors.address && (
                            <Text color="red.500">
                              {errors.address.message}
                            </Text>
                          )}
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl isInvalid={!!errors.city}>
                          <FormLabel htmlFor="city">Cidade</FormLabel>
                          <Input
                            id="city"
                            placeholder="Cidade"
                            {...register("city")}
                            maxW={{ base: "100%", md: "300px" }}
                          />
                          {errors.city && (
                            <Text color="red.500">{errors.city.message}</Text>
                          )}
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl isInvalid={!!errors.n_address}>
                          <FormLabel htmlFor="n_address">
                            Número do Endereço
                          </FormLabel>
                          <Input
                            id="n_address"
                            placeholder="Número do Endereço"
                            {...register("n_address")}
                            maxW={{ base: "100%", md: "300px" }}
                          />
                          {errors.n_address && (
                            <Text color="red.500">
                              {errors.n_address.message}
                            </Text>
                          )}
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl isInvalid={!!errors.UF}>
                          <FormLabel htmlFor="UF">UF</FormLabel>
                          <Input
                            id="UF"
                            placeholder="UF"
                            {...register("UF")}
                            maxW={{ base: "100%", md: "300px" }}
                          />
                          {errors.UF && (
                            <Text color="red.500">{errors.UF.message}</Text>
                          )}
                        </FormControl>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <FormControl isInvalid={!!errors.cnpj}>
                          <FormLabel htmlFor="cnpj">CNPJ</FormLabel>
                          <Controller
                            name="cnpj"
                            control={control}
                            render={({ field }) => (
                              <Input
                                as={InputMask}
                                mask="99.999.999/9999-99"
                                id="cnpj"
                                placeholder="00.000.000/0000-00"
                                {...field}
                                maxW={{ base: "100%", md: "300px" }}
                              />
                            )}
                          />
                          {errors.cnpj && (
                            <Text color="red.500">{errors.cnpj.message}</Text>
                          )}
                        </FormControl>
                      </GridItem>
                    </SimpleGrid>
                    <ButtonGroup spacing={4}>
                      <Button onClick={handleBack} colorScheme="gray">
                        Voltar
                      </Button>
                      <Button
                        type="submit"
                        colorScheme="red"
                        fontWeight={400}
                        bg="#A4161A"
                        isLoading={registerHotelierMutation.isPending}
                        loadingText="Cadastrando"
                      >
                        Confirmar Cadastro
                      </Button>
                    </ButtonGroup>
                  </VStack>
                )}
              </form>
            </Flex>
            <VStack
              spacing={8}
              align="center"
              justify="center"
              w={{ base: "100%", lg: "35%" }}
              mt={100}
              h="full"
            >
              <HStack spacing={4} align="center">
                <Image src={tombstoneImage} width={"auto"} height={"120px"} />
                <VStack spacing={2} align="center">
                  <Text>Já tem conta?</Text>
                  <Button
                    onClick={() => navigate("/hotelier/login")}
                    bg="#6A0572"
                    colorScheme="purple"
                    width="full"
                    size="sm"
                  >
                    Login
                  </Button>
                </VStack>
              </HStack>
              <VStack spacing={2} align="center">
                <Image src={witchImage} width={"173px"} height={"auto"} />
                <Text>Procurando novas aventuras?</Text>
                <Button
                  onClick={() => navigate("/client/register")}
                  bg="#6A0572"
                  colorScheme="purple"
                  size="sm"
                >
                  Cadastre-se como Cliente
                </Button>
              </VStack>
            </VStack>
          </Flex>
        </Container>
      </Flex>
    </Box>
  );
};

export default RegisterHotelier;
