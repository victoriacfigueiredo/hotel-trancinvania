import { Request, Response, Router } from "express";
import { Promotion } from "./promotion.controller";
import PublishedReservationService from "../services/publishedReservation.service";
import ReservationService from "../services/reservation.service";
import { z } from "zod";
import { validateData } from "../middleware/validation-middleware";
import prisma from "../database";
import { Hotelier } from "./reservation.controller";


export interface PublishedReservation{
    id: number;
    name: string;
    rooms: number; 
    people: number; 
    wifi: boolean;
    breakfast: boolean;  
    airConditioner: boolean; 
    parking: boolean;
    room_service: boolean;
    price: number;
    new_price: number;
    promotion_id?: number | null;
    hotelier_id: number;
}

export interface IGetReservationsByFilters{
    num_rooms: number;
    num_adults: number;
    num_children: number;
    city: string;
}

const publishedReservationGetDto = z.object({
    num_rooms: z.number().min(1),
    checkin: z.string(),
    checkout: z.string(),
    num_adults: z.number().min(1),
    num_children: z.number(),
})

const publishedReservationDto = z.object({
    name: z.string(),
    rooms: z.number().min(1),
    people: z.number().min(1),
    wifi: z.boolean(),
    breakfast: z.boolean(),
    airConditioner: z.boolean(),
    parking: z.boolean(),
    room_service: z.boolean(),
    price: z.number(),
})

export default class PublishedReservationController{
    private prefix = '/reservations';
    private prefixReservation = '/hotelier/:hotelier_id/reservations';

    private publishedReservationService: PublishedReservationService;
    private reservationService: ReservationService;
    // private hotelierService: Hotelier

    constructor(){
        this.publishedReservationService = new PublishedReservationService();
        this.reservationService = new ReservationService();
    }

    public setupRoutes(router: Router){
        // pega todas as reservas
        router.get(this.prefix, (req, res) => this.getAllPublishedReservations(req, res));

        router.get(this.prefix + '/:id', (req, res) => this.getPublishedReservationById(req, res));
        router.post(this.prefixReservation, validateData(publishedReservationDto), (req, res) => this.insertPublishedReservation(req, res));
        router.put(this.prefix+ '/:id', validateData(publishedReservationDto), (req, res) => this.updatePublishedReservation(req, res));
        router.delete(this.prefix+ '/:id', (req, res) => this.deletePublishedReservation(req, res));

        // pega todas as reservas com filtros especificos (busca de reservas)
        router.post(this.prefix, validateData(publishedReservationGetDto), (req, res) => this.getPublishedReservationsByFilters(req, res)); 
    }

    private async getAllPublishedReservations(req: Request, res: Response){
        const reservations = await this.publishedReservationService.getAllPublishedReservations();
        res.status(200).json(reservations);
    }

    private async getPublishedReservationById(req: Request, res: Response){
        const { id } = req.params;
        const reservation = await this.publishedReservationService.getPublishedReservationById(+id);
        res.status(200).json(reservation);
    }

    private async insertPublishedReservation(req: Request, res: Response){
        const { hotelier_id } = req.params;
        const { name, rooms, people, wifi, breakfast, airConditioner, parking, room_service, price } = req.body;
        const id = await this.publishedReservationService.insertPublishedReservation(+hotelier_id, name, rooms, people, wifi, breakfast, airConditioner, parking, room_service, price);
        res.status(201).json({status: 201, message: 'Reserva cadastrada com sucesso'});
    }

    private async updatePublishedReservation(req: Request, res: Response){
        const { id } = req.params;
        const { name, rooms, people, wifi, breakfast, airConditioner, parking, room_service, price } = req.body; 
        await this.publishedReservationService.updatePublishedReservation(+id, name, rooms, people, wifi, breakfast, airConditioner, parking, room_service, price);
        res.status(200).json({status: 200, message: 'Reserva atualizada com sucesso'});
    }

    private async deletePublishedReservation(req: Request, res: Response){
        const { id } = req.params;
        await this.publishedReservationService.deletePublishedReservation(+id);
        res.status(200).json({status: 200, message: 'Reserva deletada com sucesso'});
    }

    private async getPublishedReservationsByFilters(req: Request, res: Response) {
        const {num_rooms, city, num_adults, num_children, checkin, checkout} = req.body;
        const reservations = await this.publishedReservationService.getReservationsByFilters({num_rooms, city, num_adults, num_children,});

        let reservationsInCity = [] as PublishedReservation[];

        for(let i = 0; i < reservations.length; i++){
            let hotelier = await prisma.hotelier.findUnique({
                where: {
                    id: reservations[i].hotelier_id
                }
            });

            if(!hotelier){
                throw new Error("Hoteleiro não encontrado");
            }

            if(hotelier.city == city){
                reservationsInCity.push(reservations[i]);
            }
        }   

        let availableReservations = [] as PublishedReservation[];

        for(let i = 0; i < reservations.length; i++){
            let available = await this.reservationService.checkRoomAvailability(reservations[i].rooms, checkin, checkout, num_adults, num_children, reservations[i].id);
            if(available){
                availableReservations.push(reservations[i]);
            }
        }

        res.status(200).json(availableReservations);
    }
}