import { PrismaClient } from "@prisma/client";
import { HttpNotFoundError } from "../utils/errors/http.error";

export default class PublishedReservationRepository {
    private prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    async updateReservationPromotion(reservation_id: number | null, promotion_id: number | null): Promise<void>{
        if(reservation_id){
            const reservation = this.prisma.publishedReservation.findUnique( { where: { id: reservation_id }});
            if(!reservation){
                throw new HttpNotFoundError({ msg: 'Reservation not found'} );
            }
            await this.prisma.publishedReservation.update({ 
                where: {
                    id: reservation_id,
                },
                data: {
                    promotion_id: promotion_id,
                },
            });
        }else{
            await this.prisma.publishedReservation.updateMany({
                data: {
                    promotion_id: promotion_id,
                },
            });
        }
    }

    async getReservationPromotion(promotion_id: number): Promise<number>{
        const reservation = await this.prisma.publishedReservation.findMany({
            where: {
                promotion_id: promotion_id,
            },
        });
        if(reservation){
            return reservation.length;
        }else{
            return 0;
        }
    }

    async getReservationPromotionID(reservation_id: number): Promise<number | null>{
        const reservation = await this.prisma.publishedReservation.findUnique({
            where: {
                id: reservation_id,
            },
        });
        if(reservation){
            return reservation.promotion_id;
        }else{
            return null;
        }
    }
}
