import{PrismaClient, User, Reservation, RateReservation} from "@prisma/client";
import RateRepository from "../repositories/rate.repository";

export default class RateService{
    private rateRepository: RateRepository;

    constructor() {
        this.rateRepository = new RateRepository();
    }
    private prepareRateParams(rating: number, comments?: string): Partial<RateReservation> {
        if (rating === undefined) {
            throw new Error('Preencha todos os campos');
        }
        let params: Partial<RateReservation> = { rating };
        if (comments) {
            params.comments = comments;
        }
        return params;
    }
    async rateReservation(reservation_id: number, user_id: number, rating: number, comments?: string): Promise<void> {
        let params = this.prepareRateParams(rating, comments);
        return await this.rateRepository.rateReservation(reservation_id, user_id, params);
    }

    async getAllRatesbyReservation(reservation_id : number): Promise<RateReservation[]>{
        return await this.rateRepository.getAllRatesbyReservation(reservation_id);
    }

    async getAllRatesbyUser(user_id : number): Promise<RateReservation[]>{
        return await this.rateRepository.getAllRatesbyUser(user_id);
    }

    async deleteRateReservation(user_id: number, reservation_id: number): Promise<void>{
        await this.rateRepository.deleteRateReservation(user_id, reservation_id);
    }

    async editRateReservation(user_id: number, reservation_id: number, rating:number,comments?: string): Promise<void>{
        let params = this.prepareRateParams(rating, comments);
        return await this.rateRepository.editRateReservation(user_id, reservation_id, params);
    }
}

