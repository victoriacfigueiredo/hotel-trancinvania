import {
    Box,
    Flex,
    Heading,
    Image,
    Button,
    Text,
    Container
  } from "@chakra-ui/react";
  import { ChevronRightIcon } from "@chakra-ui/icons";
  import { Global } from "@emotion/react";
  import { NavBar } from "../../shared/components/nav-bar";
  
  // URLs das imagens
  const iconsUrls = [
    "https://i.imgur.com/TfiCssl.png", 
    "https://imgur.com/zBt02Wg.png",
    "https://imgur.com/NzD9G2t.png",
    "https://imgur.com/yt1pmFB.png",
    "https://imgur.com/BZP5wdE.png",
  ];
  const logoUrl = "https://www.cin.ufpe.br/~imprensa/marcacinpng/TMB";
  
  export const Rate = () => {
    return (
      <>
        <Global
          styles={`
            body {
              overflow: hidden;
            }
          `}
        />
        <Box
          bg="#191919"
          color="#EAEAEA"
          minH="100vh"
          fontFamily="Inter"
          position="relative"
        >
          <NavBar />
  
          {/* Adicionando a imagem 5 logo abaixo da NavBar */}
          <Box display="flex" justifyContent="center" mt={4} position="relative">
            <Image src={iconsUrls[4]} boxSize="1100px" />
          </Box>
  
          {/* Adicionando o título e os botões sobre a imagem */}
          <Box position="absolute" top="9%" left="25%" transform="translate(-50%, -50%)">
            <Text fontSize="25px" fontFamily="Inter" fontWeight="200" mb={3} textAlign="center" color="#EAEAEA">
              Minhas Avaliações
            </Text>
          </Box>
            
          <Box position="absolute" top="40%" left="25%" transform="translate(-50%, -50%)">
            <Container mt={8} p={0} minH="500px" position="relative">
              <Box display="flex" flexDirection="column" alignItems="center">
                
               
              </Box>
            </Container>
          </Box>
        </Box>
      </>
    );
  };
  