import { Request, Response, Router } from 'express';
import { z } from 'zod';
import { validateData } from '../middleware/validation-middleware';
import PromotionService from '../services/promotion.service';
import { PromotionType } from '../enums/promotion-type.enum';

export interface Promotion {
  id: number;
  discount: number;
  type: PromotionType;
  num_rooms?: number | null; 
}

const promotionCreateDto = z.object({
  discount: z.number().min(5, {message: "O desconto deve ser maior que 5%"}).max(60, { message: "O desconto deve ser menor que 60%"}),
  type: z.nativeEnum(PromotionType),
  num_rooms: z.number().min(1).optional(),
});

const promotionUpdateDto = z.object({
  discount: z.number().min(5).max(60).optional(),
  type: z.nativeEnum(PromotionType).optional(),
  num_rooms: z.number().min(1).optional(),
});

export default class PromotionController {

  private static prefix = '/promotions';
  
  static setupRoutes(router: Router) {
    router.post(this.prefix, validateData(promotionCreateDto), this.insertPromotion);
    router.get(this.prefix, this.getAllPromotions);
    router.get(this.prefix + '/:id', this.getPromotionById);
    router.delete(this.prefix, this.deleteAllPromotions);
    router.delete(this.prefix + '/:id', this.deletePromotion);
    router.patch(this.prefix + '/:id', validateData(promotionUpdateDto), this.updatePromotion);
  }

  private static async getAllPromotions(req: Request, res: Response) {
    const promotions = await PromotionService.getAllPromotions();
    res.status(200).json(promotions);
  }

  private static async getPromotionById(req: Request, res: Response) {
    const {id} = req.params
    const promotion = await PromotionService.getPromotionById(+id)
    res.status(200).json(promotion)
  }

  private static async insertPromotion(req: Request, res: Response) {
    const { discount, type, num_rooms } = req.body;
    const {id} = await PromotionService.insertPromotion(discount, type, num_rooms)
    res.status(200).json({id});
  }

  private static async deleteAllPromotions(req: Request, res: Response) {
    await PromotionService.deleteAllPromotions()
    res.status(200).json('Todas as promoções foram deletadas com sucesso!');
  }

  private static async deletePromotion(req: Request, res: Response) {
    const { id } = req.params
    await PromotionService.deletePromotionById(+id)
    res.status(200).json(`A promoção ${id} foi deletada com sucesso!`);
  }

  private static async updatePromotion(req: Request, res: Response) {
    const { id } = req.params;
    const { discount, type, num_rooms } = req.body;
    await PromotionService.updatePromotionById(+id, discount, type, num_rooms)
    res.status(200).json(`A promoção ${id} foi atualizada com sucesso!`);

  } 
}



