import { Request, Response, Router } from 'express';
import { z } from 'zod';
import { validateData } from '../middleware/validation-middleware';
import RateService from '../services/rate.service';

export interface Rate {
    rating: number;
    comments?: string | null
}

const rateReservationDto = z.object({
    client_id: z.number(),
    reservation_id: z.number(),
    rating: z.number(),
    comments: z.string().nullable().optional(),
});

export default class RateController {
    private prefix = '/rated-reservations';
    private rateService: RateService;

    constructor() {
        this.rateService = new RateService();
    }

    public setupRoutes(router: Router) {
        router.post(this.prefix, validateData(rateReservationDto), (req, res) => this.rateReservation(req, res));
        router.get(this.prefix + '/reserve/:id', (req, res) => this.getAllRatesbyPublishedReservation(req, res));
        router.get(this.prefix + '/client/:id', (req, res) => this.getAllRatesbyClient(req, res));
        router.delete(this.prefix + '/:client_id/:reservation_id', (req, res) => this.deleteRateReservation(req, res));
        router.patch(this.prefix + '/client_id/:reservation_id', validateData(rateReservationDto), (req, res) => this.editRateReservation(req, res));
    }

    private async rateReservation(req: Request, res: Response) {
        const {reservation_id, client_id, rating, comments } = req.body;
        const result = await this.rateService.rateReservation(Number(reservation_id), Number(client_id), rating, comments);
        res.status(200).json(result);
    }

    private async getAllRatesbyPublishedReservation(req: Request, res: Response) {
        const { id } = req.params;
        const rateList = await this.rateService.getAllRatesbyPublishedReservation(Number(id));
        res.status(200).json(rateList);
    }

    private async getAllRatesbyClient(req: Request, res: Response) {
        const { id } = req.params;
        const rateList = await this.rateService.getAllRatesbyClient(Number(id));
        res.status(200).json(rateList);
    }

    private async deleteRateReservation(req: Request, res: Response) {
        const { client_id, reservation_id } = req.params;
        await this.rateService.deleteRateReservation(Number(client_id), Number(reservation_id));
        res.status(204).json(`A avaliação foi deletada com sucesso!`);
    }

    private async editRateReservation(req: Request, res: Response) {
        const {client_id, reservation_id } = req.params;
        const { rating, comments } = req.body;
        await this.rateService.editRateReservation(Number(reservation_id), Number(client_id), rating, comments);
        res.status(200).json(`A avaliação foi atualizada com sucesso!`);
    }
}
