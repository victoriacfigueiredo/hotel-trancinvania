import APIService from "../../APIService";

export default class APIServicePublishedReservation{
    private api = APIService.api;

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

    async uploadImage(reservation_id:number, formData: FormData) {
        return this.api.post(`/reservation/${reservation_id}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

}