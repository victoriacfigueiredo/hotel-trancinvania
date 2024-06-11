import { Promotion } from "../controllers/promotion.controller";
import { PromotionType } from "../enums/promotion-type.enum";
import PromotionRepository from "../repositories/promotion.repository";

export default class PromotionService {

    private promotionRepository: PromotionRepository;

    constructor(){
        this.promotionRepository = new PromotionRepository();
    }

    async insertPromotion(discount: number, type: string, num_rooms?: number): Promise<{ id: number }> {
        if (type === PromotionType.LIMITE_QUARTO && num_rooms === undefined) {
            throw new Error("É necessário informar a quantidade de quartos")
        }
        
        const params = {discount, type, num_rooms} as Promotion;
        
        return await this.promotionRepository.insertPromotion(params);

    }

    async getAllPromotions(): Promise<Promotion[]> {
        return await this.promotionRepository.getAllPromotions();
    }

    async getPromotionById(id: number): Promise<Promotion> {
        return await this.promotionRepository.getPromotionById(id);
    }

    async updatePromotionById(id: number, discount: number, type: string, num_rooms?: number): Promise<void> {

        
        let params = {discount, type, num_rooms} as Promotion;

        if(type !== 'ILIMITADA' && num_rooms === undefined){
            throw new Error('É necessário informar a quantidade de quartos');
        }

        await this.promotionRepository.updatePromotionById(id, params);
    }

    async deletePromotionById(id: number): Promise<void> {
        await this.promotionRepository.deletePromotionById(id);
    }

    async deleteAllPromotions(): Promise<void> {
        await this.promotionRepository.deleteAllPromotions();
    }
}