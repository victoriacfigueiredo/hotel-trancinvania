import { Request, Response, Router } from 'express';
import { z } from 'zod';
import { validateData } from '../middleware/validation-middleware';
import ReservationService from '../services/reservation.service';
import { CardType } from '../enums/paymentMethod-type.enum';
import { PromotionType } from '../enums/promotion-type.enum';

export interface Hotelier{
    id: number;
    name: string; 
    email: string;
    password: string;
    hotel: string; 
    adress: string;
    cnpj: string;
}

export interface Promotion{
    id: number; 
    discount: number; 
    type: PromotionType;
    num_rooms?: number;
}

export interface Reserve {
    id: number;
    num_rooms: number;
    checkin: string; // "YYYY-MM-DD"
    checkout: string;
    num_adults: number;
    num_children: number; 
    paymentMethodName: string;
    price: number;
    publishedReservationId: number;
    clientId: number;
    paymentMethodId: number;
}

export interface PublishedReservation{
    id: number;
    name: string;
    rooms: number; 
    people: number; 
    wifi: Boolean;
    breakfast: Boolean;  
    airConditioner: Boolean; 
    parking: Boolean;
    room_service: Boolean;
    price: number;
    new_price: number;
    promotion?: Promotion;
    promotionId?: number;
    hotelier?: Hotelier;
    hotelier_id: number; 
}

export interface Client{
    id: number;
    name: string; 
    email: string; 
    phone: string; 
    password: string;
    cpf: string; 
    birthDate: string; 
}

export interface PaymentMethod{
    id: number;
    name: string;
    number: string;
    cvv: number;
    expiryDate: string; 
    type: CardType;
    clientId: number;
}


const reservationCreateDto = z.object({
    num_rooms: z.number().min(1),
    checkin: z.string(),
    checkout: z.string(),
    num_adults: z.number().min(1),
    num_children: z.number(),
    paymentMethodName: z.string(),
});

const reservationUpdateDto = z.object({
    num_rooms: z.number().min(1),
    checkin: z.string(),
    checkout: z.string(),
    num_adults: z.number().min(1),
    num_children: z.number(),
});

export default class ReserveController {
    private prefix = '/client/:clientId/publishedReservation/:publishedReservationId/reserve';
    private reservationService: ReservationService;
    constructor() {
        this.reservationService = new ReservationService();
    }

    public setupRoutes(router: Router) {
        // criar novas reservas
        router.post(this.prefix, validateData(reservationCreateDto), (req, res) => this.createReservation(req, res));
        // editar reserva
        router.put(this.prefix + '/:id', validateData(reservationUpdateDto), (req, res) => this.updateReservation(req, res));
        // cancelar reserva
        router.delete(this.prefix + '/:id', (req, res) => this.cancelReservation(req, res));
        // pegar os dados de uma reserva
        router.get(this.prefix + '/:id', (req, res) => this.getReservationById(req, res));
        // pegar todas as reservas de um cliente (minhas reservas)
        router.get(this.prefix, (req, res) => this.getReservationsByClient(req, res));
    }

    private async createReservation(req: Request, res: Response) {
        const {num_rooms, checkin, checkout, num_adults, num_children, paymentMethodName} = req.body;
        const publishedReservationId = parseInt(req.params.publishedReservationId);
        const clientId = parseInt(req.params.clientId);
        const {id} = await this.reservationService.createReservation(num_rooms, checkin, checkout, num_adults, num_children, paymentMethodName, publishedReservationId, clientId)
        res.status(200).json({id});
    }
    

    private async cancelReservation(req: Request, res: Response) {
        const {id} = req.params;
        await this.reservationService.cancelReservation(+id);
        res.status(200).json(`A reserva ${id} foi cancelada`);
    }

    private async updateReservation(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const publishedReservationId = parseInt(req.params.publishedReservationId);
            const {num_rooms, checkin, checkout, num_adults, num_children} = req.body;
    
            // verificar se a reserva está disponível para as novas datas 
            const availableRooms = await this.reservationService.checkRoomAvailability(num_rooms, checkin, checkout, num_adults, num_children, publishedReservationId);
            if (!availableRooms) {
                return res.status(400).json({ error: `Não há quartos disponíveis para o período de ${checkin} a ${checkout}` });
            }
    
            await this.reservationService.updateReservation(+id, num_rooms, checkin, checkout, num_adults, num_children);
            res.status(200).json(`A reserva ${id} foi editada com sucesso!`);
        } catch (error) {
            console.error(error); // Log the error
            res.status(500).json({ error: 'Ocorreu um erro ao tentar atualizar a reserva.' });
        }
    }
    
    

    private async getReservationById(req: Request, res: Response) {
        const { id } = req.params;
        const reservation = await this.reservationService.getReservationById(+id);
        res.status(200).json(reservation);  
    }

    private async getReservationsByClient(req: Request, res: Response) {
        const { clientId } = req.params;
        const reservations = await this.reservationService.getReservationsByClient(+clientId);
        res.status(200).json(reservations);       
    }
}











