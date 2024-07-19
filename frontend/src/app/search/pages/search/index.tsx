import { Box, Container, Flex, Heading, Spacer } from "@chakra-ui/react"
import { NavBar } from "../../../../shared/components/nav-bar"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPublishedReservationsByFilters } from "../../services";
import { ISearch } from "../../../home/services";
import { toast } from "react-toastify";


export const SearchPage = () => {

    const [queryParams, setQueryParams] = useSearchParams();
    const [search, setSearch] = useState<ISearch>();
    const [reservations, SetReservations] = useState<any[]>([]);
    const [promotion, SetPromotion] = useState<any>();
    
    
    
    useEffect(() => {

        const handleSearch = async () => {
            let city = queryParams.get("city");
            let checkin = queryParams.get("checkin");
            let checkout = queryParams.get("checkout");
            let num_adults = queryParams.get("num_adults");
            let num_children = queryParams.get("num_children");
            let num_rooms = queryParams.get("num_rooms");
    
            if(!city || !checkin || !checkout || !num_adults || !num_children || !num_rooms){
                return;
            }
        
            setSearch({
                city: city,            
                checkin: checkin,
                checkout: checkout,
                num_adults: parseInt(num_adults),
                num_children: parseInt(num_children),
                num_rooms: parseInt(num_rooms)
            })
    
            if(!search){
                return
            }
    
            let response;
            try{
              response = await getPublishedReservationsByFilters(search);
        
            } catch (error ){
              const err = error as any;
              if(err.response.status == 400){
                toast.warning('Um erro ocorreu')
              }

              return;
            }

            console.log(response)
        
            SetReservations(response);
        }

        handleSearch();
    },
    []);

    const navigate = useNavigate();

    return(
        <Box
            bg="#191919"
            color="#EAEAEA"
            minH="100vh"
            fontFamily="Inter"
            position="relative"
        >
            <NavBar />

            <Box mt={12} p={0} minH="500px" position="relative">
                <Box position="relative" zIndex="1">
                <Heading as='h2' size='2xl' noOfLines={1} m={3}>
                    Resultados de Busca
                    <Flex flexWrap="wrap" gap="75px" mt="30px">
                    {reservations.map(reservation => (
                            <Box position="relative" w="250px" h="300px" _hover={{transform: 'translateY(-5px)'}}>
                                {reservation.promotion_id && (
                                    <Flex alignItems="center" justifyContent="center" color="#eaeaea" fontSize="20px" textAlign="center" position="absolute" bottom="77%" left="80%" width="90px" height="90px" backgroundSize="contain" backgroundRepeat="no-repeat" zIndex="1" /**style={{ backgroundImage: `url(${morcegoImg})` }}**/> <Box transform={'translateY(-60%)'} fontSize="13px">{promotion[reservation.id] !== 0 && `${promotion[reservation.id]}%`}</Box></Flex>
                                )}
                                <Box position="relative" w="270px" h="300px" bg="transparent"  borderRadius="10px" overflow="hidden" color="#191919" cursor="pointer" key={reservation.id} onClick={() => navigate(`/publishedReservationDetails/${reservation.id}`)}>
                                    <Box w="100%" h="72%" backgroundSize="cover" backgroundPosition="center" borderBottomLeftRadius="10px" borderBottomRightRadius="10px"  style={{backgroundImage: `url(http://localhost:5001${reservation.imageUrl})`}}></Box>
                                    <Flex justify="center" align="center">
                                        <Box fontSize="20px" color="#eaeaea" textAlign="start" fontWeight="bold">{reservation.name}</Box>
                                        <Spacer />
                                        <Box fontSize="20px" color="#eaeaea" textAlign="start" fontWeight="bold">{reservation.rating}</Box>
                                    </Flex>
                                    <Flex textAlign="start" fontSize="20px" color="#eaeaea">R$ {reservation.new_price.toFixed(0)} { reservation.promotion_id &&   <Box fontSize="15px" textDecoration="line-through" ml="5px" mt="3px"> R$ {reservation.price}</Box>} a diária</Flex>
                                </Box>
                            </Box>
                    ))}
                </Flex>
                </Heading>
                </Box>
            </Box>

        </Box>
    )
}