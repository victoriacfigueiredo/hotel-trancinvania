import React from "react";
import {
 Box,
 Flex,
 Heading,
 Image,
 Button,
 Text,
 Container,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Global } from "@emotion/react";
import { NavBar } from "../../shared/components/nav-bar";


// URLs das imagens
const hotelImages = [
 "https://via.placeholder.com/150", // Placeholder para Hotel 1
 "https://via.placeholder.com/150", // Placeholder para Hotel 2
];


export const Whishlist = () => {
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


       {/* Adicionando o título */}
       <Box display="flex" justifyContent="center" mt={4} position="relative">
         <Heading as="h1" size="lg" textAlign="center" color="#EAEAEA" mb={4}>
           Lista de Desejos
         </Heading>
       </Box>


       {/* Conteúdo principal */}
       <Box display="flex" justifyContent="center" alignItems="center" mt={8}>
         <Flex direction="row" justifyContent="space-around" width="80%">
           {/* Cartão do Hotel 1 */}
           <Box border="1px solid #EAEAEA" borderRadius="8px" overflow="hidden" bg="#282828" width="250px">
             <Box display="flex" justifyContent="center" alignItems="center" height="150px">
               <Image src={hotelImages[0]} alt="Hotel 1" />
             </Box>
             <Box p={4}>
               <Text fontSize="lg" mb={4} textAlign="center">Hotel 1</Text>
               <Flex justifyContent="space-between">
                 <Button bg="#784A95" color="#EAEAEA" _hover={{ bg: "#5e3a72" }}>
                   <DeleteIcon boxSize="20px" />
                 </Button>
                 <Button bg="#784A95" color="#EAEAEA" _hover={{ bg: "#5e3a72" }}>Ir</Button>
               </Flex>
             </Box>
           </Box>


           {/* Cartão do Hotel 2 */}
           <Box border="1px solid #EAEAEA" borderRadius="8px" overflow="hidden" bg="#282828" width="250px">
             <Box display="flex" justifyContent="center" alignItems="center" height="150px">
               <Image src={hotelImages[1]} alt="Hotel 2" />
             </Box>
             <Box p={4}>
               <Text fontSize="lg" mb={4} textAlign="center">Hotel 2</Text>
               <Flex justifyContent="space-between">
                 <Button bg="#784A95" color="#EAEAEA" _hover={{ bg: "#5e3a72" }}>
                   <DeleteIcon boxSize="20px" />
                 </Button>
                 <Button bg="#784A95" color="#EAEAEA" _hover={{ bg: "#5e3a72" }}>Ir</Button>
               </Flex>
             </Box>
           </Box>
         </Flex>
       </Box>
     </Box>
   </>
 );
};
