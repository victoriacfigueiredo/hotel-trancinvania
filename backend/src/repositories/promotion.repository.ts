import { Promotion } from "../controllers/promotion.controller";
import { openDb } from "../database/configDB";

export async function createTablePromotion() {
    try {
        const db = await openDb();
        await db.exec('CREATE TABLE IF NOT EXISTS promotions (id INTEGER PRIMARY KEY AUTOINCREMENT, discount INTEGER, type TEXT, num_rooms INTEGER)');
    } catch (error) {
        console.error('Erro:', error);
    }
}

export default class PromotionRepository {
    static async insertPromotion(sql: string, params: (number | string | null)[]) : Promise<{id: number}>{
        try {
            const db = await openDb();
            const result = await db.run(sql, params);
            if (!result || typeof result.lastID !== 'number') {
                throw new Error('Falha ao cadastrar promoção');
            }
            return { id: result.lastID };
        } catch (error) {
            throw error;
        }
    }

    static async getAllPromotions(sql:string): Promise<Promotion[]> {
        try {
            const db = await openDb();
            const rows = await db.all<Promotion[]>(sql);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getPromotionById(id: number, sql: string): Promise<Promotion> {
        try {
            const db = await openDb();
            const row = await db.get<Promotion>(sql, id);
            if (!row) {
                throw new Error('Promoção não encontrada');
            }
            return row;
        } catch (error) {
            throw error;
        }
    }

    static async updatePromotionById(id: number, params: (number | string | null)[], sql: string): Promise<void> {
        try {
            const db = await openDb();
            await db.run(sql, params);
        } catch (error) {
            throw error;
        }
    }

    static async deletePromotionById(id: number, sql: string): Promise<void> {
        try {
            const db = await openDb();
            await db.run(sql, id);
        } catch (error) {
            throw error;
        }
    }

    static async deleteAllPromotions(sql: string): Promise<void> {
        try {
            const db = await openDb();
            await db.run(sql);
        } catch (error) {
            throw error;
        }
    }
}