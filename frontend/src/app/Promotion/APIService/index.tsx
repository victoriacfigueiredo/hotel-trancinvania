import APIService from "../../APIService";

export enum PromotionType{
    ILIMITADA = 'ILIMITADA',
    LIMITE_QUARTO = 'LIMITE_QUARTO'
}

export default class APIServicePromotion{
    private api = APIService.api;

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
}