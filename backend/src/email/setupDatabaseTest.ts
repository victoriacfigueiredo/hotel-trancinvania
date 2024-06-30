import { Prisma } from "@prisma/client";
import { Hotelier, PublishedReservation, Client, Reserve, PaymentMethod } from "../controllers/reservation.controller";
import prisma from "../database";

export default class SetupDatabaseTest{

    

    async resetDatabase(){
        await prisma.rateReservation.deleteMany();
        await prisma.clientSavedReservation.deleteMany();
        await prisma.promotion.deleteMany();
        await prisma.reserve.deleteMany();
        await prisma.publishedReservation.deleteMany();
        await prisma.hotelier.deleteMany();
        await prisma.paymentMethod.deleteMany();
        await prisma.client.deleteMany();
    }

    async setupDatabaseforPromotionTests(hotelier: Prisma.HotelierCreateInput, publishedReservation: Prisma.PublishedReservationCreateInput[], promotion?: Prisma.PromotionCreateInput[]){
        await prisma.hotelier.create({data: hotelier});
        if(promotion){
            for(let i = 0; i<promotion.length; i++){
                await prisma.promotion.create({data: promotion[i]});
            }
        }
        for(let i = 0; i<publishedReservation.length; i++){
            await prisma.publishedReservation.create({data: publishedReservation[i]});
        }
    }

    async setupDatabaseforEmailTests(client: Prisma.ClientCreateInput, hotelier: Prisma.HotelierCreateInput, publishedReservation: Prisma.PublishedReservationCreateInput, paymentMethod: Prisma.PaymentMethodCreateInput, reservation?: Prisma.ReserveCreateInput){
        await prisma.client.create({data: client});
        await prisma.hotelier.create({data: hotelier});
        await prisma.publishedReservation.create({data: publishedReservation});
        await prisma.paymentMethod.create({data: paymentMethod});
        if(reservation){
            await prisma.reserve.create({data: reservation});
        }
    }

    async setupDatabaseforReservationTests(client: Prisma.ClientCreateInput, hotelier: Prisma.HotelierCreateInput, publishedReservation: Prisma.PublishedReservationCreateInput, paymentMethod?: Prisma.PaymentMethodCreateInput, reservation?: Prisma.ReserveCreateInput){
        await prisma.client.create({data: client});
        await prisma.hotelier.create({data: hotelier});
        await prisma.publishedReservation.create({data: publishedReservation});
        if(paymentMethod){
            await prisma.paymentMethod.create({data: paymentMethod});
        }
        if(reservation){
            await prisma.reserve.create({data: reservation});
        }
    }

    async setupDatabaseForBuscaTests(publishedReservation: Prisma.PublishedReservationCreateInput, reservation: Reserve, hotelier: Hotelier, promotion: Prisma.PromotionCreateInput, client: Client, paymentMethod: Prisma.PaymentMethodCreateInput){
        let {id, ...reserv} = reservation;
        await this.prisma.client.create({data: client});
        await this.prisma.paymentMethod.create({data: paymentMethod})
        await this.prisma.hotelier.create({data: hotelier});
        await this.prisma.promotion.create({data: promotion});
        await this.prisma.publishedReservation.create({data: publishedReservation});
        await this.prisma.reserve.create({data: reserv});
    }
}
