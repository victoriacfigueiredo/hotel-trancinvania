import { PublishedReservation, Client,ClientSavedReservation } from '@prisma/client';
import SaveRepository from "../repositories/save.repository";

export default class SaveService {
    private saveRepository: SaveRepository;

    constructor() {
        this.saveRepository = new SaveRepository();
    }

    async saveReservation(client_id: number, reservationId: number): Promise<{id: number}> {
        return await this.saveRepository.saveReservation(client_id, reservationId);
    }
    async getSavedReservationByClientId(id: number): Promise<PublishedReservation[]> {
        return await this.saveRepository.getSavedReservationByClientId(id);
    }
    async  getClientsbyReservationId(id: number): Promise<Client[]>{
        return await this.saveRepository.getClientsbyReservationId(id);
    }
    async deleteSavedReservationById(client_id: number,reservation_id: number): Promise<void> {
        await this.saveRepository.deleteSavedReservationById(client_id,reservation_id);
    }   
}