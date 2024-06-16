import { Request, Response, Router } from 'express';
import { z } from 'zod';
import { validateData } from '../middleware/validation-middleware';
import ReservationService from '../services/reservation.service';
import { CardType } from '../enums/paymentMethod-type.enum';

export interface Reservation {
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
    num_rooms: number; 
    price: number; 
    num_people: number; 
    wifi: Boolean;
    breakfast: Boolean; 
    parking: Boolean; 
    airConditioning: Boolean; 
    roomService: Boolean;
    promotionId?: number;
    hotelierId: number; 
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

export default class ReservationController {
    private prefix = '/client/:clientId/publishedReservation/:publishedReservationId/reservation';
    private reservationService: ReservationService;

    constructor() {
        this.reservationService = new ReservationService();
    }

    public setupRoutes(router: Router) {
        // criar novas reservas
        router.post(this.prefix, validateData(reservationCreateDto), (req, res) => this.createReservation(req, res));
        // editar reserva
        router.patch(this.prefix + '/:id', validateData(reservationUpdateDto), (req, res) => this.updateReservation(req, res));
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
        const {id} = req.params;
        const publishedReservationId = parseInt(req.params.publishedReservationId);
        const {num_rooms, checkin, checkout, num_adults, num_children} = req.body;
        //verificar se a reserva está disponível para as novas datas 
        const availableRooms = await this.reservationService.checkRoomAvailability(num_rooms, checkin, checkout, num_adults, num_children, publishedReservationId);
        if (!availableRooms) {
            return res.status(400).json({ error: `Não há quartos disponíveis para o período de ${checkin} a ${checkout}` });
        }   
        await this.reservationService.updateReservation(+id, num_rooms, checkin, checkout, num_adults, num_children);
        res.status(200).json(`A reserva ${id} foi editada com sucesso!`);
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











