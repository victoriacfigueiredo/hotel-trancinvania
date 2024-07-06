import { Box, Flex, Image, Text, Link } from "@chakra-ui/react";
import { FaSpider, FaBed, FaUser } from "react-icons/fa";
const hotelLogoUrl = "https://i.imgur.com/QcX5CZ7.png";

export const NavBar: React.FC = () => {
    return (
        <Box bg="#EAEAEA" color="#000000" height="178.2px">
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

    )
};