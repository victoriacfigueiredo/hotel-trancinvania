import { Hotelier, PublishedReservation, Client, Reserve, PaymentMethod } from "../controllers/reservation.controller";
import { PrismaClient, Prisma} from '@prisma/client';

export default class SetupDatabaseTest{

    private prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    async resetDatabase(){
        await this.prisma.promotion.deleteMany();
        await this.prisma.reserve.deleteMany();
        await this.prisma.publishedReservation.deleteMany();
        await this.prisma.hotelier.deleteMany();
        await this.prisma.paymentMethod.deleteMany();
        await this.prisma.client.deleteMany();
    }

    async setupDatabaseforPromotionTests(hotelier: Prisma.HotelierCreateInput, publishedReservation: Prisma.PublishedReservationCreateInput[], promotion?: Prisma.PromotionCreateInput[]){
        await this.prisma.hotelier.create({data: hotelier});
        if(promotion){
            for(let i = 0; i<promotion.length; i++){
                await this.prisma.promotion.create({data: promotion[i]});
            }
        }
        for(let i = 0; i<publishedReservation.length; i++){
            await this.prisma.publishedReservation.create({data: publishedReservation[i]});
        }
    }

    async setupDatabaseforEmailTests(client: Prisma.ClientCreateInput, hotelier: Prisma.HotelierCreateInput, publishedReservation: Prisma.PublishedReservationCreateInput, paymentMethod: Prisma.PaymentMethodCreateInput, reservation?: Prisma.ReserveCreateInput){
        await this.prisma.client.create({data: client});
        await this.prisma.hotelier.create({data: hotelier});
        await this.prisma.publishedReservation.create({data: publishedReservation});
        await this.prisma.paymentMethod.create({data: paymentMethod});
        if(reservation){
            await this.prisma.reserve.create({data: reservation});
        }
    }

    async setupDatabaseforReservationTests(client: Prisma.ClientCreateInput, hotelier: Prisma.HotelierCreateInput, publishedReservation: Prisma.PublishedReservationCreateInput, paymentMethod?: Prisma.PaymentMethodCreateInput, reservation?: Prisma.ReserveCreateInput){
        await this.prisma.client.create({data: client});
        await this.prisma.hotelier.create({data: hotelier});
        await this.prisma.publishedReservation.create({data: publishedReservation});
        if(paymentMethod){
            await this.prisma.paymentMethod.create({data: paymentMethod});
        }
        if(reservation){
            await this.prisma.reserve.create({data: reservation});
        }
    }

    async setupDatabaseForBuscaTests(publishedReservation: Prisma.PublishedReservationCreateInput, reservation: Prisma.ReserveCreateInput, hotelier: Prisma.HotelierCreateInput, promotion: Prisma.PromotionCreateInput, client: Prisma.ClientCreateInput, paymentMethod: Prisma.PaymentMethodCreateInput){
        let cliente = await this.prisma.client.create({data: client});
        let hoteleiro = await this.prisma.hotelier.create({data: hotelier});
        let promocao = await this.prisma.promotion.create({data: promotion});



        let promocoes = await this.prisma.promotion.findMany();
        if(promocoes.length == 0){
            promocao = await this.prisma.promotion.create({data: promotion});
        }

        
        publishedReservation['hotelier_id'] = hoteleiro.id;
        publishedReservation['promotion_id'] = promocao.id;
        let pub = await this.prisma.publishedReservation.create({data: publishedReservation});

                
        let pubs = await this.prisma.publishedReservation.findMany();
        if(pubs.length == 0){
            publishedReservation['hotelier_id'] = hoteleiro.id;
            publishedReservation['promotion_id'] = promocao.id;
            pub = await this.prisma.publishedReservation.create({data: publishedReservation});
        }

        console.log(pubs)
        
        
        let clientes = await this.prisma.client.findMany();
        if(clientes.length == 0){
            cliente = await this.prisma.client.create({data: client});
        }

        paymentMethod['clientId'] = cliente.id;

        let pay = await this.prisma.paymentMethod.create({data: paymentMethod})
        
        reservation['publishedReservationId'] = pub.id;
        reservation['clientId'] = cliente.id;
        reservation['paymentMethodId'] = pay.id;
        await this.prisma.reserve.create({data: reservation});
    }

    
}
