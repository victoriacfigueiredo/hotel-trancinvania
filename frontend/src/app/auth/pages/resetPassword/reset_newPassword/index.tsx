import { Box } from "@chakra-ui/react";
import React from "react";
import { BottomLeftTopRightImages } from "../../../../../shared/components/spider-images";
import { NavBar } from "../../../../../shared/components/nav-bar";

export const ResetNewPassword: React.FC = () => {
  return (
    <Box bg="#191919" color="white" minH="100vh" fontFamily="Inter, sans-serif">
      <NavBar />
      <BottomLeftTopRightImages />
    </Box>
  );
};
