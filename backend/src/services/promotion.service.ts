import { Promotion } from "../controllers/promotion.controller";
import { PromotionType } from "../enums/promotion-type.enum";
import PromotionRepository from "../repositories/promotion.repository";
import EmailService from "./email.service";

export default class PromotionService {

    private promotionRepository: PromotionRepository;

    constructor(){
        this.promotionRepository = new PromotionRepository();
    }

    private preparePromotionParams(discount: number, type: string, num_rooms?: number): Promotion {
        if (type === PromotionType.LIMITE_QUARTO && num_rooms === undefined) {
            throw new Error('Preencha todos os campos');
        }
    
        let params = { discount, type, num_rooms } as Promotion;
    
        if (type === PromotionType.ILIMITADA) {
            params.num_rooms = null;
        }
    
        return params;
    }

    async insertPromotion(discount: number, type: string, num_rooms?: number): Promise<{ id: number }> {
        let params = this.preparePromotionParams(discount, type, num_rooms)
        return await this.promotionRepository.insertPromotion(params);
    }

    async getAllPromotions(): Promise<Promotion[]> {
        return await this.promotionRepository.getAllPromotions();
    }

    async getPromotionById(id: number): Promise<Promotion> {
        return await this.promotionRepository.getPromotionById(id);
    }

    async updatePromotionById(id: number, discount: number, type: string, num_rooms?: number): Promise<void> {
        let params = this.preparePromotionParams(discount, type, num_rooms)
        await this.promotionRepository.updatePromotionById(id, params);
    }

    async deletePromotionById(id: number): Promise<void> {
        await this.promotionRepository.deletePromotionById(id);
    }

    async deleteAllPromotions(): Promise<void> {
        await this.promotionRepository.deleteAllPromotions();
    }
}