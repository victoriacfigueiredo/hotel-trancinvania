// src/App.tsx
import { Box, Flex, Heading, Image, Button, Text } from "@chakra-ui/react";
import { NavBar } from "../../../../shared/components/nav-bar";
import { SearchBar } from "../../components/search-bar";
import { AnimatedTooltipPreview } from "../../components/animated-tooltip-preview";
import Card from "../../components/ui/card";
import { FlipWordsTitle } from "../../components/flip-words-title";

// URLs das imagens dos cards
const iconsUrls = [
  "https://i.imgur.com/FMcfc42.png",
  "https://i.imgur.com/6Bo0jpq.png",
  "https://i.imgur.com/ikLfv60.png",
  "https://i.imgur.com/NXxtrYx.png",
];
const logoUrl = "https://www.cin.ufpe.br/~imprensa/marcacinpng/TMB";
const draculaUrl = "https://i.imgur.com/RP7qAvr.png";
const mavisUrl = "https://i.imgur.com/VvUqQfb.png";

export const HomePage = () => {
  return (
    <Box bg="#191919" color="#EAEAEA" minH="100vh" fontFamily="Inter">
      <NavBar />

      <Flex justify="center" align="center" mb={8}>
        <Image
          src={draculaUrl}
          alt="Drácula"
          width="367.2px"
          height="683.4px"
          mb={8}
          mt={150}
        />
        <Box textAlign="center" mx={4}>
          <Text fontSize="30px" fontFamily="Inter" fontWeight="200">
            O melhor gerenciador de hotéis do submundo.
          </Text>
          <FlipWordsTitle />
          <SearchBar />
          <Button
            variant="outline"
            height="80px"
            width="307px"
            fontSize="30px"
            fontWeight="200"
            fontFamily="Inter"
            borderColor="#EAEAEA"
            color="#EAEAEA"
            _hover={{
              bg: "transparent",
              color: "#FAC006",
              borderColor: "#FAC006",
            }}
            borderRadius="13px"
            px={12}
            bg="transparent"
            mt={100}
          >
            Saiba mais
          </Button>
        </Box>
        <Image
          src={mavisUrl}
          alt="Mavis Drácula"
          width="324px"
          height="682.3px"
          mb={8}
          mt={150}
        />
      </Flex>
      <Box bg="#191919" color="#EAEAEA" p={8} fontFamily="Inter">
        <Flex
          justify="center"
          align="center"
          gap="50px"
          wrap="wrap"
          mb={12}
          mt={300}
        >
          <Card
            imageUrl={iconsUrls[0]}
            title="Cadastre-se"
            description="Comece a planejar sua estadia hoje mesmo."
            imageSize={{ width: "172.7px", height: "120px" }} // Tamanho específico para o ícone
          />
          <Card
            imageUrl={iconsUrls[1]}
            title="Faça já sua reserva!"
            description="Descubra ofertas surpreenDENTES."
            imageSize={{ width: "144.5px", height: "133.9px" }} // Tamanho específico para o ícone
          />
          <Card
            imageUrl={iconsUrls[2]}
            title="Anuncie sua propriedade"
            description="Atraia humanos e monstros."
            imageSize={{ width: "136.2px", height: "128.9px" }} // Tamanho específico para o ícone
          />
          <Card
            imageUrl={iconsUrls[3]}
            title="Pague com BloodCard"
            description="Cadastre seus melhores cartões aqui."
            imageSize={{ width: "88.6px", height: "128.9px" }} // Tamanho específico para o ícone
          />
        </Flex>
        <Box textAlign="center" mb={100} mt={151}>
          <Heading size="md" mb={31.7} fontFamily="Inter" fontWeight="200">
            NOSSO TIME DE DESENVOLVIMENTO
          </Heading>
          <Flex justify="center" align="center" wrap="wrap" gap="20px">
            <Box display="flex" alignItems="center">
              <AnimatedTooltipPreview />
              <Box width="2px" height="80px" bg="#EAEAEA" mx={4} />
              <Image
                src={logoUrl}
                alt="CIn UFPE Logo"
                width="291.8px"
                height="129.6px"
              />
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
