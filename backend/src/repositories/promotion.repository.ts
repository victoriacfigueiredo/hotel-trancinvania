import { PrismaClient } from "@prisma/client";
import { Promotion } from "../controllers/promotion.controller";

export default class PromotionRepository {
    private prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }


    async insertPromotion(params: Promotion) : Promise<{id: number}>{
        try {
            const result = await this.prisma.promotion.create({data: params})
            
            return { id: result.id };
        } catch (error) {
            throw error;
        }
    }

    async getAllPromotions(): Promise<Promotion[]> {
        try {
            const promotions = await this.prisma.promotion.findMany() as Promotion[];

            return promotions;
        } catch (error) {
            throw error;
        }
    }

    async getPromotionById(id: number): Promise<Promotion> {
        try {
            const promotion = await this.prisma.promotion.findUnique({
                where: {
                    id: id
                }
            })
            if (!promotion) {
                throw new Error('Promoção não encontrada');
            }

            return promotion as Promotion;
        } catch (error) {
            throw error;
        }
    }

    async updatePromotionById(id: number, params: Promotion): Promise<void> {
        try {
            const promotion = await this.prisma.promotion.update({
                where: {
                    id: id
                },
                data: params
            });
        } catch (error) {
            throw error;
        }
    }

    async deletePromotionById(id: number): Promise<void> {
        try {
            await this.prisma.promotion.delete({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async deleteAllPromotions(): Promise<void> {
        try {
            await this.prisma.promotion.deleteMany({})
        } catch (error) {
            throw error;
        }
    }
}