import { PrismaClient } from "@prisma/client";
import { HttpNotFoundError } from "../utils/errors/http.error";

export default class PublishedReservationRepository {
    private prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }


    async updateReservationPromotion(reservation_id: number, promotion_id: number | null): Promise<void>{
        const reservation = await this.prisma.publishedReservation.findUnique( { where: { id: reservation_id }});
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
    }

    async updateAllReservationPromotion(promotion_id: number): Promise<void>{  
        await this.prisma.publishedReservation.updateMany({
            
            data: {
                promotion_id: promotion_id,
                
            },
        });
    }

    async getReservationPromotion(promotion_id: number): Promise<number>{
        const reservation = await this.prisma.publishedReservation.findMany({ where: {promotion_id: promotion_id}});
        if(reservation){
            return reservation.length;
        }else{
            return 0;
        }
    }

    async promotionInReservation() : Promise <number | null> {
        const reservations = await this.prisma.publishedReservation.findMany();
        const allNullPromotionIds = reservations.every(reservation => reservation.promotion_id === null);
    
        if (allNullPromotionIds) {
            return null;
        }else{
            return 1;
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

    async updateAllreservations(): Promise<void> {
        const reservations = await this.prisma.publishedReservation.findMany();

        for(const reservation of reservations){
            if(reservation.promotion_id === null){
                await this.prisma.publishedReservation.update({where: {id: reservation.id}, data: {new_price: reservation.price}})
            }else{
                const promotion = await this.prisma.promotion.findUnique({where: {id: reservation.promotion_id}}) 
                if(promotion){
                    let price = reservation.price * (1 - (promotion.discount/100));
                
                    await this.prisma.publishedReservation.update({
                        where: {id: reservation.id},
                        data: {
                            new_price: price,
                        },
                    });
                }
            }
        }
    }
}
