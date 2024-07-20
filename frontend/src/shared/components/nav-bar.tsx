import {
  Box,
  Flex,
  Image,
  Text,
  Link,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FaSpider, FaBed, FaUser, FaBars } from "react-icons/fa";
import LogoHotel from "../assets/logo_hotel.png";

export const NavBar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isReservasMenuOpen,
    onOpen: onReservasMenuOpen,
    onClose: onReservasMenuClose,
  } = useDisclosure();
  const {
    isOpen: isPerfilMenuOpen,
    onOpen: onPerfilMenuOpen,
    onClose: onPerfilMenuClose,
  } = useDisclosure();

  const username = localStorage.getItem("userName");
  const userType = localStorage.getItem("userType");
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userType");
    localStorage.removeItem("userName");

    if (userType === "hotelier") {
      navigate("/");
    } else {
      navigate("/");
    }
  };

  return (
    <Box bg="#EAEAEA" color="#000000" height="80px">
      <Flex justify="space-between" align="center" p={4} height="100%">
        <Image src={LogoHotel} alt="Hotel Transilvânia Logo" height="60px" />

        {/* Desktop Menu */}
        <Flex
          align="center"
          gap={20}
          mr="40px"
          fontFamily="Inter"
          fontWeight="700"
          display={{ base: "none", md: "flex" }}
        >
          <Link
            as={RouterLink}
            to="/"
            display="flex"
            alignItems="center"
            textDecoration="none"
            color="#000000"
            fontSize="24px"
          >
            <FaSpider style={{ marginRight: "6px" }} />
            <Text>Início</Text>
          </Link>

          <Menu isOpen={isReservasMenuOpen}>
            <MenuButton
              as={Button}
              leftIcon={<FaBed />}
              onMouseEnter={onReservasMenuOpen}
              onMouseLeave={onReservasMenuClose}
              bg="transparent"
              _hover={{ bg: "transparent" }}
              fontSize="24px"
              fontWeight="700"
              textDecoration="none"
              color="#000000"
              display="flex"
              alignItems="center"
            >
              <Text>Reservas</Text>
            </MenuButton>
            <MenuList
              onMouseEnter={onReservasMenuOpen}
              onMouseLeave={onReservasMenuClose}
            >
              {!isLoggedIn || userType === "client" ? (
                <MenuItem as={RouterLink} to="/reservations">
                  Realizar Reserva
                </MenuItem>
              ) : null}
              {userType === "hotelier" && (
                <>
                  <MenuItem as={RouterLink} to="/publishedReservation">
                    Publicar Reservas
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/publishedReservationList">
                    Gerenciar Reservas
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>

          <Menu isOpen={isPerfilMenuOpen}>
            <MenuButton
              as={Button}
              leftIcon={<FaUser />}
              onMouseEnter={onPerfilMenuOpen}
              onMouseLeave={onPerfilMenuClose}
              bg="transparent"
              _hover={{ bg: "transparent" }}
              fontSize="24px"
              fontWeight="700"
              textDecoration="none"
              color="#000000"
              display="flex"
              alignItems="center"
            >
              <Text>{username || "Conta"}</Text>
            </MenuButton>
            <MenuList
              onMouseEnter={onPerfilMenuOpen}
              onMouseLeave={onPerfilMenuClose}
            >
              {isLoggedIn && userType === "client" && (
                <>
                  <MenuItem as={RouterLink} to="/client/profile">
                    Meu Perfil
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/perfil/pagamento">
                    Pagamento
                  </MenuItem>
                </>
              )}
              {isLoggedIn && userType === "hotelier" && (
                <MenuItem as={RouterLink} to="/hotelier/profile">
                  Meus Dados
                </MenuItem>
              )}
              {!isLoggedIn && (
                <>
                  <MenuItem as={RouterLink} to="/client/login">
                    Sou Cliente
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/hotelier/login">
                    Sou Hoteleiro
                  </MenuItem>
                </>
              )}
              {isLoggedIn && (
                <MenuItem onClick={handleLogout} fontWeight={"700"}>
                  Logout
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Flex>

        {/* Mobile Menu Button */}
        <IconButton
          aria-label="Open menu"
          icon={<FaBars />}
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          bg="transparent"
          _hover={{ bg: "transparent" }}
        />
      </Flex>

      {/* Mobile Menu Drawer */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <Link
              as={RouterLink}
              to="/"
              display="flex"
              alignItems="center"
              textDecoration="none"
              color="#000000"
              fontSize="24px"
              mb={4}
              onClick={onClose}
            >
              <FaSpider style={{ marginRight: "6px" }} />
              <Text>Início</Text>
            </Link>

            <Box mb={4}>
              <Text fontSize="24px" fontWeight="700" color="#000000" mb={2}>
                <FaBed style={{ marginRight: "6px", display: "inline" }} />
                Reservas
              </Text>
              <Box pl={6}>
                {!isLoggedIn || userType === "client" ? (
                  <Link
                    as={RouterLink}
                    to="/reservations"
                    display="block"
                    textDecoration="none"
                    color="#000000"
                    fontSize="20px"
                    mb={2}
                    onClick={onClose}
                  >
                    Realizar Reserva
                  </Link>
                ) : null}
                {userType === "hotelier" && (
                  <>
                    <Link
                      as={RouterLink}
                      to="/publishedReservation"
                      display="block"
                      textDecoration="none"
                      color="#000000"
                      fontSize="20px"
                      mb={2}
                      onClick={onClose}
                    >
                      Publicar Reservas
                    </Link>
                    <Link
                      as={RouterLink}
                      to="/publishedReservationList"
                      display="block"
                      textDecoration="none"
                      color="#000000"
                      fontSize="20px"
                      mb={2}
                      onClick={onClose}
                    >
                      Gerenciar Reservas
                    </Link>
                  </>
                )}
              </Box>
            </Box>

            <Box mb={4}>
              <Text fontSize="24px" fontWeight="700" color="#000000" mb={2}>
                <FaUser style={{ marginRight: "6px", display: "inline" }} />
                {username || "Conta"}
              </Text>
              <Box pl={6}>
                {isLoggedIn && userType === "client" && (
                  <>
                    <Link
                      as={RouterLink}
                      to="/client/profile"
                      display="block"
                      textDecoration="none"
                      color="#000000"
                      fontSize="20px"
                      mb={2}
                      onClick={onClose}
                    >
                      Meu Perfil
                    </Link>
                    <Link
                      as={RouterLink}
                      to="/perfil/pagamento"
                      display="block"
                      textDecoration="none"
                      color="#000000"
                      fontSize="20px"
                      mb={2}
                      onClick={onClose}
                    >
                      Pagamento
                    </Link>
                  </>
                )}
                {isLoggedIn && userType === "hotelier" && (
                  <Link
                    as={RouterLink}
                    to="/hotelier/profile"
                    display="block"
                    textDecoration="none"
                    color="#000000"
                    fontSize="20px"
                    mb={2}
                    onClick={onClose}
                  >
                    Meus Dados
                  </Link>
                )}
                {!isLoggedIn && (
                  <>
                    <Link
                      as={RouterLink}
                      to="/client/login"
                      display="block"
                      textDecoration="none"
                      color="#000000"
                      fontSize="20px"
                      mb={2}
                      onClick={onClose}
                    >
                      Sou Cliente
                    </Link>
                    <Link
                      as={RouterLink}
                      to="/hotelier/login"
                      display="block"
                      textDecoration="none"
                      color="#000000"
                      fontSize="20px"
                      mb={2}
                      onClick={onClose}
                    >
                      Sou Hoteleiro
                    </Link>
                  </>
                )}
                {isLoggedIn && (
                  <Link
                    as={RouterLink}
                    to="#"
                    display="block"
                    textDecoration="none"
                    color="#000000"
                    fontSize="20px"
                    mb={2}
                    onClick={() => {
                      handleLogout();
                      onClose();
                    }}
                  >
                    Logout
                  </Link>
                )}
              </Box>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
