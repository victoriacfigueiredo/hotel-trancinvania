import { Promotion } from "../controllers/promotion.controller";
import { PromotionType } from "../enums/promotion-type.enum";
import PromotionRepository from "../repositories/promotion.repository";

export default class PromotionService {
    static async insertPromotion(discount: number, type: string, num_rooms?: number): Promise<{ id: number }> {
        let sql: string;
        let params: (number | string | null)[];
        if (type === PromotionType.LIMITE_QUARTO) {
            sql = 'INSERT INTO promotions (discount, type, num_rooms) values (?, ?, ?)';
            params = [discount, type, num_rooms || null]; 
        } else {
            sql = 'INSERT INTO promotions (discount, type) values (?, ?)';
            params = [discount, type];
        }
        return await PromotionRepository.insertPromotion(sql, params);

    }

    static async getAllPromotions(): Promise<Promotion[]> {
        const sql = 'SELECT * FROM promotions';
        return await PromotionRepository.getAllPromotions(sql);
    }

    static async getPromotionById(id: number): Promise<Promotion> {
        const sql = 'SELECT * FROM promotions WHERE id = ?';
        return await PromotionRepository.getPromotionById(id, sql)
    }

    static async updatePromotionById(id: number, discount: number, type: string, num_rooms?: number): Promise<void> {
        let sql: string;
        let params: (number | string | null)[];
        if (type === PromotionType.LIMITE_QUARTO) {
            sql = 'UPDATE promotions SET discount = ?, type = ?, num_rooms = ? WHERE id = ?';
            params = [discount, type, num_rooms || null, id];
        } else {
            sql = 'UPDATE promotions SET discount = ?, type = ? WHERE id = ?';
            params = [discount, type, id];
        }
        await PromotionRepository.updatePromotionById(id, params, sql);
    }

    static async deletePromotionById(id: number): Promise<void> {
        const sql = 'DELETE FROM promotions WHERE id = ?';
        await PromotionRepository.deletePromotionById(id, sql);
    }

    static async deleteAllPromotions(): Promise<void> {
        const sql = 'DELETE FROM promotions';
        await PromotionRepository.deleteAllPromotions(sql)
    }
}