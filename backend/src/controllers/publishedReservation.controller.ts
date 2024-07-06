import { Request, Response, Router } from "express";
import { Promotion } from "./promotion.controller";
import PublishedReservationService from "../services/publishedReservation.service";
import ReservationService from "../services/reservation.service";
import { z } from "zod";
import { validateData } from "../middleware/validation-middleware";
import prisma from "../database";
import { Hotelier } from "./reservation.controller";
import PromotionService from "../services/promotion.service";


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

export default class PublishedReservationController{
    private prefix = '/reservations';
    private publishedReservationService: PublishedReservationService;
    private reservationService: ReservationService;
    private promotionService: PromotionService;
    // private hotelierService: Hotelier

    constructor(){
        this.publishedReservationService = new PublishedReservationService();
        this.reservationService = new ReservationService();
        this.promotionService = new PromotionService();
    }

    public setupRoutes(router: Router){
        router.get(this.prefix, (req, res) => this.getAllPublishedReservations(req, res)); // pega todas as reservas
        router.get(this.prefix + '/:id', (req, res) => this.getPublishedReservationById(req, res)); // pega reserva detalhada por id
        router.post(this.prefix, validateData(publishedReservationGetDto), (req, res) => this.getPublishedReservationsByFilters(req, res)); // pega todas as reservas com filtros especificos (busca de reservas)
        
        
    }

    private async getPublishedReservationById(req: Request, res: Response){
        const { id } = req.params;
        const reservation = await this.publishedReservationService.getPublishedReservationById(parseInt(id));

        if(!reservation){
            return res.status(400).send({});
            // throw new Error("Não existe reserva publicada com esse id");
        }

        console.log(reservation);

        let associatedPromotions = {} as any;

        if(reservation.promotion_id){
            associatedPromotions = await this.promotionService.getPromotionById(reservation.promotion_id);
        }

        let fullReservation = {
            ...reservation,
            associatedPromotions
        }

        console.log(fullReservation)
        
        res.status(200).send(fullReservation);
    }

    private async getAllPublishedReservations(req: Request, res: Response){
        const reservations = await this.publishedReservationService.getAllPublishedReservations();
        res.status(200).json(reservations);
    }
    
    private async getPublishedReservationsByFilters(req: Request, res: Response) {
        const {num_rooms, city, num_adults, num_children, checkin, checkout} = req.body;
        const reservations = await this.publishedReservationService.getReservationsByFilters({num_rooms, city, num_adults, num_children,});

        let reservationsInCity = [] as any[];

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
                reservationsInCity.push({...reservations[i], city: hotelier.city});
            }
        }   

        let availableReservations = [] as any[];

        for(let i = 0; i < reservationsInCity.length; i++){
            let available = await this.reservationService.checkRoomAvailability(reservations[i].rooms, checkin, checkout, num_adults, num_children, reservationsInCity[i].id);
            if(available){
                availableReservations.push(reservationsInCity[i]);
            }
        }

        res.status(200).json(availableReservations);
    }
}