import { Flex, IconButton, Input } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

export const SearchBar = () => {
  return (
    <Flex justify="center" align="center" mb={8}>
      <Input
        placeholder="Destino"
        variant="outline"
        mx={2}
        height="80px"
        width="250px"
      />
      <Input
        placeholder="Check-in"
        type="date"
        variant="outline"
        mx={2}
        height="80px"
        width="250px"
      />
      <Input
        placeholder="Check-out"
        type="date"
        variant="outline"
        mx={2}
        height="80px"
        width="250px"
      />
      <Input
        placeholder="Quem"
        variant="outline"
        mx={2}
        height="80px"
        width="250px"
      />
      <IconButton
        aria-label="Search"
        icon={<FaSearch />}
        mx={2}
        height="80px"
        width="80px"
      />
    </Flex>
  );
};
