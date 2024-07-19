import { Flex, IconButton, Input } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

export const SearchBar = () => {
  return (
    <Flex justify="center" align="center" mb={8}>
      <Input
        placeholder="Destino"
        variant="outline"
        mx={2}
        height="70px"
        width="130px"
      />
      <Input
        placeholder="Check-in"
        type="date"
        variant="outline"
        mx={2}
        height="70px"
        width="180px"
      />
      <Input
        placeholder="Check-out"
        type="date"
        variant="outline"
        mx={2}
        height="70px"
        width="180px"
      />
      <Input
        placeholder="Quem"
        variant="outline"
        mx={2}
        height="70px"
        width="130px"
      />
      <IconButton
        aria-label="Search"
        icon={<FaSearch />}
        mx={2}
        height="70px"
        width="70px"
        bg="#A4161A"
        colorScheme="red"
      />
    </Flex>
  );
};
