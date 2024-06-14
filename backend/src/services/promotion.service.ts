import { Promotion } from "../controllers/promotion.controller";
import { PromotionType } from "../enums/promotion-type.enum";
import PromotionRepository from "../repositories/promotion.repository";
import { HttpBadRequestError, HttpError, HttpInternalServerError, HttpNotFoundError } from "../utils/errors/http.error";

export default class PromotionService {

    private promotionRepository: PromotionRepository;

    constructor(){
        this.promotionRepository = new PromotionRepository();
    }

    private preparePromotionParams(discount: number, type: string, num_rooms?: number): Promotion {
        if (type === PromotionType.LIMITE_QUARTO && num_rooms === undefined) {
            throw new HttpBadRequestError({
                msg: 'Fill in all fields'
            });
        }
        let params = { discount, type, num_rooms } as Promotion;
    
        if (type === PromotionType.ILIMITADA) {
            params.num_rooms = null;
        }
        return params;
    }

    async insertPromotion(discount: number, type: string, num_rooms?: number): Promise<{ id: number }> {
        let params = this.preparePromotionParams(discount, type, num_rooms);
        try{
            return await this.promotionRepository.insertPromotion(params);
        }catch(error: any){
            if (error instanceof HttpError){
                throw error;
            }else{
                throw new HttpInternalServerError({msg: `Error inserting promotion: ${error.message}`});
            }
        }
    }

    async getAllPromotions(): Promise<Promotion[]> {
        try{
            return await this.promotionRepository.getAllPromotions();
        }catch(error: any){
            throw new HttpInternalServerError({msg: `Error fetching all promotions: ${error.message}`});
        }
    }

    async getPromotionById(id: number): Promise<Promotion> {
        try{
            const promotion = await this.promotionRepository.getPromotionById(id);
            if (!promotion) {
                throw new HttpNotFoundError({
                    msg: 'Promotion not found'
                });
            }
            return promotion;
        }catch(error: any){
            if (error instanceof HttpError){
                throw error;
            }else{
                throw new HttpInternalServerError({msg: `Error fetching promotion: ${error.message}`});
            }
        }
    }

    async updatePromotionById(id: number, discount: number, type: string, num_rooms?: number): Promise<void> {
        const params = this.preparePromotionParams(discount, type, num_rooms);
        try{
            if (!(await this.promotionRepository.getPromotionById(id))) {
                throw new HttpNotFoundError({
                    msg: 'Promotion not found'
                });
            }
            await this.promotionRepository.updatePromotionById(id, params);
        }catch(error: any){
            if (error instanceof HttpError){
                throw error;
            }else{
                throw new HttpInternalServerError({msg: `Error updating promotion: ${error.message}`});
            }
        }
    }

    async deletePromotionById(id: number): Promise<void> {
        try{
            if (!(await this.promotionRepository.getPromotionById(id))) {
                throw new HttpNotFoundError({
                    msg: 'Promotion not found'
                });
            } 
            await this.promotionRepository.deletePromotionById(id); 
        }catch(error: any){
            if (error instanceof HttpError){
                throw error;
            }else{
                throw new HttpInternalServerError({msg: `Error deleting promotion: ${error.message}`});
            }
        }
    }

    async deleteAllPromotions(): Promise<void> {
        try{
            await this.promotionRepository.deleteAllPromotions();
        }catch(error: any){
            throw new HttpInternalServerError({msg: `Error deleting all promotions: ${error.message}`});
        }
    }
}