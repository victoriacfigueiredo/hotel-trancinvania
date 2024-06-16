import{PrismaClient, User, Reservation, RateReservation} from "@prisma/client";
import { format, parse, isAfter } from 'date-fns';

export default class RateRepository{
    private prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    async rateReservation(reservation_id: number, user_id:number, params: Partial<RateReservation>): Promise<void>{
        try {
            const reservation = await this.prisma.reservation.findUnique({
                where:{
                    id : reservation_id
                }    
            });

            if (!reservation) {
                throw new Error('Reserva não encontrada');
            }
            // Teste para ver se já é possível fazer a reserva
            const checkoutDate = parse(reservation.checkout, 'dd-MM-yyyy', new Date());
            const now = new Date();

            if (!isAfter(checkoutDate, now)) {
                throw new Error('Reserva não disponível para avaliação');
            }
            if (params.rating === undefined) {
                throw new Error('Rating is required');
            }

            // Criação de RateReservation com dados combinados corretamente
            await this.prisma.rateReservation.create({
                data: {
                    reservation_id,
                    user_id,
                    rating: params.rating,
                    comments: params.comments
                }
            });
        } 
        catch (error) {
            throw error;
        }
    }

    async getAllRatesbyReservation(reservation_id : number): Promise<RateReservation[]>{
        try{
            const rates = await this.prisma.rateReservation.findMany({
                where:{
                    reservation_id:reservation_id,
                    
                },
                include:{
                    reservation: true,
                    user: true
                }
            })

            if (!rates) {
                throw new Error('Nenhuma avaliação na na reserva');
            }
            return rates as RateReservation[];
        }
        catch (error){
            throw error;
        }
    }

    async getAllRatesbyUser(user_id : number): Promise<RateReservation[]>{
        try{
            const rates = await this.prisma.rateReservation.findMany({
                where:{
                    user_id:user_id,
                    
                },
                include:{
                    reservation: true,
                    user: true
                }
            })

            if (!rates) {
                throw new Error('Nenhuma avaliação feita pelo usuário');
            }
            return rates as RateReservation[];
        }
        catch (error){
            throw error;
        }

    }
    async deleteRateReservation(user_id: number, reservation_id: number): Promise<void> { 
        try {
            await this.prisma.rateReservation.deleteMany({
                where:{
                    user_id : user_id,
                    reservation_id : reservation_id
                }
            })
        } 
        catch (error) {
            throw error;
        }

    }
    async editRateReservation(user_id: number,reservation_id:number, params: Partial<RateReservation>): Promise<void>{
        try {
            const rate = await this.prisma.rateReservation.update({
                where: {
                    user_id_reservation_id: {
                        reservation_id: reservation_id,
                        user_id: user_id
                    }
                },
                data: params
            });
        } catch (error) {
            throw error;
        }
    }

}
