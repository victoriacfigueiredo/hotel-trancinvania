// src/App.tsx
import { Box, Flex, Heading, Image, Input, Button, IconButton, Text, extendTheme, ChakraProvider, Link } from "@chakra-ui/react";
import "@fontsource/inter"; // Importando a fonte Inter
import "@fontsource/inter/200.css"; // Importando a versão ExtraLight de Inter
import { FaSpider, FaBed, FaUser } from "react-icons/fa";
import Card from "./app/home/components/Card";
import { AnimatedTooltipPreview } from "./app/home/components/ui/animated-tooltip-preview";
import { FaSearch } from "react-icons/fa";
import { Global } from "@emotion/react";

// URLs das imagens dos cards
const iconsUrls = [
  "https://i.imgur.com/FMcfc42.png",
  "https://i.imgur.com/6Bo0jpq.png",
  "https://i.imgur.com/ikLfv60.png",
  "https://i.imgur.com/NXxtrYx.png",
];
const logoUrl = "https://www.cin.ufpe.br/~imprensa/marcacinpng/TMB";
const hotelLogoUrl = "https://i.imgur.com/QcX5CZ7.png";
const draculaUrl = "https://i.imgur.com/RP7qAvr.png";
const mavisUrl = "https://i.imgur.com/VvUqQfb.png";

const theme = extendTheme({
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
});

const App = () => {
  return (
    <Box bg="#191919" color="#FFFFFF" minH="100vh" fontFamily="Inter">
      <Box bg="#FFFFFF" color="#000000" height="178.2px">
        <Flex justify="space-between" align="center" p={4} height="100%">
          <Image src={hotelLogoUrl} alt="Hotel Transilvânia Logo" height="120px" />
          <Flex align="center" gap={80} mr="70px" fontFamily="Inter" fontWeight="700" >
            <Link href="#" display="flex" alignItems="center" textDecoration="none" color="#000000" fontSize="30px">
              <FaSpider style={{ marginRight: '8px' }} />
              <Text>Início</Text>
            </Link>
            <Link href="#" display="flex" alignItems="center" textDecoration="none" color="#000000" fontSize="30px">
              <FaBed style={{ marginRight: '8px' }} />
              <Text>Reservas</Text>
            </Link>
            <Link href="#" display="flex" alignItems="center" textDecoration="none" color="#000000" fontSize="30px">
              <FaUser style={{ marginRight: '8px' }} />
              <Text>Perfil</Text>
            </Link>
          </Flex>
        </Flex>
      </Box>
      <Flex justify="center" align="center" mb={8}>
        <Image src={draculaUrl} alt="Vampire Man" width="367.2px" height="683.4px" mb={8} mt={150} />
        <Box textAlign="center" mx={4}>
          <Text fontSize="30px" fontFamily="Inter" fontWeight="400">O melhor gerenciador de hotéis do submundo.</Text>
          <Heading fontSize="80px" mb={8} fontFamily="Inter" >HOTÉIS PARA HUMANOS</Heading>
          <Flex justify="center" align="center" mb={8}>
            <Input placeholder="Destino" variant="outline" mx={2} height="80px" width="250px" />
            <Input placeholder="Check-in" type="date" variant="outline" mx={2} height="80px" width="250px" />
            <Input placeholder="Check-out" type="date" variant="outline" mx={2} height="80px" width="250px" />
            <Input placeholder="Quem" variant="outline" mx={2} height="80px" width="250px" />
            <IconButton aria-label="Search" icon={<FaSearch />} mx={2} height="80px" width="80px" />
          </Flex>
          <Button
              variant="outline"
              height="80px"
              width="307px"
              fontSize="30px"
              fontFamily="Inter"
              fontWeight="200"
              borderColor="#FFFFFF"
              color="#FFFFFF"
              _hover={{ bg: "transparent", color: "#FAC006", borderColor: "#FAC006" }}
              borderRadius="13px"
              px={12}
              bg="transparent"
              mt={100}
            >
              Saiba mais
            </Button>
        </Box>
        <Image src={mavisUrl} alt="Vampire Woman" width="324px" height="682.3px" mb={8} mt={150} />
      </Flex>
      <Box bg="#191919" color="#FFFFFF" p={8} fontFamily="Inter">
        <Flex justify="center" align="center" gap="50px" wrap="wrap" mb={12} mt={200}>
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
        <Box textAlign="center" mb={50} mt={151}>
          <Heading size="md" mb={31.7} fontFamily="Inter" fontWeight="200">NOSSO TIME DE DESENVOLVIMENTO</Heading>
          <Flex justify="center" align="center" wrap="wrap" gap="20px">
            <Box display="flex" alignItems="center">
              <AnimatedTooltipPreview />
              <Box width="2px" height="80px" bg="#FFFFFF" mx={4} />
              <Image src={logoUrl} alt="CIn UFPE Logo" width="291.8px" height="129.6px" />
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default App;