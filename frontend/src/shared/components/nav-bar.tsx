import { Box, Flex, Image, Text, Link } from "@chakra-ui/react";
import { FaSpider, FaBed, FaUser } from "react-icons/fa";
const hotelLogoUrl = "https://i.imgur.com/QcX5CZ7.png";

export const NavBar: React.FC = () => {
  return (
    <Box bg="#EAEAEA" color="#000000" height="120px">
      <Flex justify="space-between" align="center" p={4} height="100%">
        <Image src={hotelLogoUrl} alt="Hotel Transilvânia Logo" height="80px" />
        <Flex
          align="center"
          gap={20}
          mr="40px"
          fontFamily="Inter"
          fontWeight="700"
        >
          <Link
            href="#"
            display="flex"
            alignItems="center"
            textDecoration="none"
            color="#000000"
            fontSize="24px"
          >
            <FaSpider style={{ marginRight: "6px" }} />
            <Text>Início</Text>
          </Link>
          <Link
            href="#"
            display="flex"
            alignItems="center"
            textDecoration="none"
            color="#000000"
            fontSize="24px"
          >
            <FaBed style={{ marginRight: "6px" }} />
            <Text>Reservas</Text>
          </Link>
          <Link
            href="#"
            display="flex"
            alignItems="center"
            textDecoration="none"
            color="#000000"
            fontSize="24px"
          >
            <FaUser style={{ marginRight: "6px" }} />
            <Text>Perfil</Text>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};
