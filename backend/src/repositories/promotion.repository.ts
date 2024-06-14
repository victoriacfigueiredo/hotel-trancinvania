import { PrismaClient } from "@prisma/client";
import { Promotion } from "../controllers/promotion.controller";

export default class PromotionRepository {
    private prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    async insertPromotion(params: Promotion) : Promise<{id: number}>{
        const result = await this.prisma.promotion.create({data: params})
        return { id: result.id };
    }

    async getAllPromotions(): Promise<Promotion[]> {
        const promotions = await this.prisma.promotion.findMany() as Promotion[];
        return promotions;
    }

    async getPromotionById(id: number): Promise<Promotion> {
        const promotion = await this.prisma.promotion.findUnique({
            where: {
                id: id
            }
        })
        return promotion as Promotion;
    }

    async updatePromotionById(id: number, params: Promotion): Promise<Promotion> {
        const promotion = await this.prisma.promotion.update({
            where: {
                id: id
            },
            data: params
        });
        return promotion as Promotion;
    }

    async deletePromotionById(id: number): Promise<Promotion> {
        const promotion = await this.prisma.promotion.delete({
            where: {
                id: id
            }
        });
        return promotion as Promotion;
    }

    async deleteAllPromotions(): Promise<void> {
        await this.prisma.promotion.deleteMany();
    }
}