import { IGetReservationsByFilters, PublishedReservation } from "../controllers/publishedReservation.controller";
import PublishedReservationRepository from "../repositories/publishedReservation.repository";
import ReservationRepository from "../repositories/reservation.repository";
import { HttpBadRequestError, HttpError, HttpInternalServerError, HttpNotFoundError } from "../utils/errors/http.error";


export default class PublishedReservationService {

    private publishedReservationRepository: PublishedReservationRepository;

    constructor() {
        this.publishedReservationRepository = new PublishedReservationRepository();
    }

    private preparePublishedReservationParams(hotelier_id: number, name: string, rooms: number, people: number, wifi: boolean, breakfast: boolean, airConditioner: boolean, parking: boolean, room_service: boolean, price: number, promotion_id?: number | null): PublishedReservation{
        if(promotion_id === undefined){
            promotion_id = null;
        }
        let new_price = price;
        let params = { name, rooms, people, wifi, breakfast, airConditioner, parking, room_service, price, new_price, promotion_id, hotelier_id } as PublishedReservation;
        return params;
    }

    public async getAllPublishedReservations(){
        return await this.publishedReservationRepository.getAllPublishedReservations();
    }

    public async getReservationsByFilters(params : IGetReservationsByFilters){
        const matchReservations = await this.publishedReservationRepository.getPublishedReservationsByFilters(params);
        return matchReservations;
    }

    public async getPublishedReservationById(id: number): Promise<PublishedReservation>{
        const Reservation = await this.publishedReservationRepository.getPublishedReservationById(id);
        return Reservation;
    }

    public async insertPublishedReservation(hotelier_id: number, name: string, rooms: number, people: number, wifi:boolean, breakfast:boolean, airConditioner:boolean, parking: boolean, room_service: boolean, price: number):Promise<void>{
        const params = this.preparePublishedReservationParams(hotelier_id, name, rooms, people, wifi, breakfast, airConditioner, parking, room_service, price);
        try{
            const reservation = await this.publishedReservationRepository.checkReservationAlreadyExists(hotelier_id, name);
            if(reservation){
                throw new HttpBadRequestError({msg: 'Reseva existente!'})
            }
            await this.publishedReservationRepository.insertPublishedReservation(params);
        }catch(error: any){
            if (error instanceof HttpError){
                throw error;
            }else{
                throw new HttpInternalServerError({msg: `Error inserting reservation: ${error.message}`});
            }
        }
    }

    public async updatePublishedReservation(id:number, name: string, rooms: number, people: number, wifi:boolean, breakfast:boolean, airConditioner:boolean, parking: boolean, room_service: boolean, price: number):Promise<void>{
        try{
            const reservation = await this.publishedReservationRepository.getPublishedReservationById(id);
            if(!reservation){
                throw new HttpNotFoundError({msg: 'Reservation not found'});
            }
            const params = this.preparePublishedReservationParams(reservation.hotelier_id, name, rooms, people, wifi, breakfast, airConditioner, parking, room_service, price, reservation.promotion_id);
            await this.publishedReservationRepository.updatePublishedReservationById(id, params);
        }catch(error: any){
            if (error instanceof HttpError){
                throw error;
            }else{
                throw new HttpInternalServerError({msg: `Error updating reservation: ${error.message}`});
            }
        }
    }

    public async deletePublishedReservation(id: number) {
        try{
            const reservation = await this.publishedReservationRepository.getPublishedReservationById(id);
            if(!reservation){
                throw new HttpNotFoundError({msg: 'Reservation not found'});
            }
            const reservations = await this.publishedReservationRepository.checkNoReservation(id);
            if(reservations?.length !== 0){
                throw new HttpBadRequestError({msg: 'Esse quartos possui reservas pendentes'})
            }
            await this.publishedReservationRepository.deletePublishedReservationById(id);
        }catch(error: any){
            if (error instanceof HttpError){
                throw error;
            }else{
                throw new HttpInternalServerError({msg: `Error deleting reservation: ${error.message}`});
            }
        }
    }
}