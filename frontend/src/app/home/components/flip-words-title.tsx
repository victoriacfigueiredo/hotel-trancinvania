// src/components/ui/flip-words-title.tsx
import React from "react";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import { FlipWords } from "./ui/flip-words-effect";

export function FlipWordsTitle() {
  const words = ["HUMANOS", "FANTASMAS", "VAMPIROS", "ZUMBIS"];
  const textColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box
      h="40rem"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      px={4}
    >
      <Heading
        fontSize="80px"
        mb={8}
        color={textColor}
        fontFamily="Trancinfont"
        display="flex"
        alignItems="start"
        textAlign={"left"}
      >
        HOTÉIS PArA{" "}
        <Box as="span" ml="8px" position="relative" display="inline-block">
          <FlipWords words={words} />
        </Box>
      </Heading>
    </Box>
  );
}
