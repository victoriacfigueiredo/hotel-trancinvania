import apiService from "../../../shared/services/api-service";
import { ISearch } from "../../home/services";

export async function getPublishedReservationsByFilters(search: ISearch){
    const response = await apiService.post('/reservations', search);

    console.log(response)

    return response.data;
}