import axios from "axios";
import { AxiosInstance } from "axios";

export enum PromotionType{
    ILIMITADA = 'ILIMITADA',
    LIMITE_QUARTO = 'LIMITE_QUARTO'
}

export default class APIService{
    private api: AxiosInstance;
    constructor() {
        this.api = axios.create({
            baseURL: "http://localhost:5001"
        });
    }

    async createPromotion(reservation_id: number, discount: number, type: PromotionType, num_rooms?: number){
        return this.api.post(`/reservation/${reservation_id}/promotions`, {discount: discount, type: type, num_rooms: num_rooms});
    }

    async getPromotionById(reservation_id: number){
        return this.api.get(`/reservation/${reservation_id}/promotions`);
    }

    async updatePromotion(reservation_id: number, discount: number, type: PromotionType, num_rooms?: number){
        return this.api.put(`/reservation/${reservation_id}/promotions`, {discount: discount, type: type, num_rooms: num_rooms});
    }

    async deletePromotion(reservation_id: number){
        return this.api.delete(`/reservation/${reservation_id}/promotions`);
    }

    async createPromotionAll(discount: number, type: PromotionType, num_rooms?: number){
        return this.api.post(`/reservation/promotions`, {discount: discount, type: type, num_rooms: num_rooms});
    }

    async deleteAllPromotions(){
        return this.api.delete(`/reservation/promotions`);
    }

    async getAllPublishedReservation(){
        return this.api.get(`/reservations`);
    }

    async getPublishedReservationById(reservation_id: number){
        return this.api.get(`/reservations/${reservation_id}`);
    }

    async createPublishedReservation(hotelier_id: number, name: string, rooms: number, people: number, wifi: boolean, breakfast: boolean, airConditioner: boolean, parking: boolean, room_service: boolean, price: number){
        return this.api.post(`/hotelier/${hotelier_id}/reservations`, {name: name, rooms: rooms, people: people, wifi: wifi, breakfast: breakfast, airConditioner: airConditioner, parking: parking, room_service: room_service, price:price});
    }

    async updatePublishedReservation(reservation_id: number,  name: string, rooms: number, people: number, wifi: boolean, breakfast: boolean, airConditioner: boolean, parking: boolean, room_service: boolean, price: number){
        return this.api.put(`/reservations/${reservation_id}`, {name: name, rooms: rooms, people: people, wifi: wifi, breakfast: breakfast, airConditioner: airConditioner, parking: parking, room_service: room_service, price:price});
    }

    async deletePublishedReservation(reservation_id: number){
        return this.api.delete(`/reservations/${reservation_id}`);
    }


}