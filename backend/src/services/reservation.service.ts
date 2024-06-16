import {Reserve} from "../controllers/reservation.controller";
import ReservationRepository from "../repositories/reservation.repository";

export default class ReservationService {

    private reservationRepository: ReservationRepository;

    constructor() {
        this.reservationRepository = new ReservationRepository();
    }

    private async prepareReservationParams(num_rooms: number, checkin: string, checkout: string, num_adults: number, num_children: number, paymentMethodName: string, publishedReservationId: number, clientId: number): Promise<Reserve> {
        if (!num_rooms || !checkin || !checkout || !num_adults || !paymentMethodName) {
            throw new Error('Ops! Parece que algum campo não foi preenchido');
        }
        // Buscar a reserva publicada
        const publishedReservation = await this.reservationRepository.getPublishedReservationById(publishedReservationId);
        if (!publishedReservation) {
            throw new Error(`Oferta de reserva com ID ${publishedReservationId} não encontrada`);
        }
        // Buscar o cliente
        const client = await this.reservationRepository.getClientById(clientId);
        if (!client) {
            throw new Error(`Faça login ou cadastre-se!`);
        }
        // Buscar os métodos de pagamento
        const paymentMethods = await this.reservationRepository.getPaymentMethod(clientId);
        if (!paymentMethods) {
            throw new Error(`Cadastre um método de pagamento`);
        }
        
        // Encontrar o método de pagamento pelo nome
        let paymentMethodId = 0;
        for (const payMethod of paymentMethods) {
            if (payMethod.name.toLowerCase() === paymentMethodName.toLowerCase()) {
                paymentMethodId = payMethod.id;
                break;
            }
        }
        if (paymentMethodId === 0) {
            throw new Error(`Método de pagamento ${paymentMethodName} não encontrado`);
        }

        // Calculando o preço da reserva
        const numDays = this.calculateNumDays(checkin, checkout);
        const price = numDays * num_rooms * publishedReservation.price;

        let params = { num_rooms, checkin, checkout, num_adults, num_children, paymentMethodName, price, publishedReservationId, clientId, paymentMethodId } as Reserve;
        return params;
    }

    private calculateNumDays(checkin: string, checkout: string): number {
        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);
        const timeDifference = checkoutDate.getTime() - checkinDate.getTime();
        return Math.ceil(timeDifference / (1000 * 3600 * 24));
    }

    async createReservation(num_rooms: number, checkin: string, checkout: string, num_adults: number, num_children: number, paymentMethodName: string, publishedReservationId: number, clientId: number): Promise<{id: number}> {
        const availableRooms = await this.checkRoomAvailability(num_rooms, checkin, checkout, num_adults, num_children, publishedReservationId);
        if (!availableRooms) {
            throw new Error('Não há quartos disponíveis para o período selecionado');
        }
        const reservationParams = await this.prepareReservationParams(num_rooms, checkin, checkout, num_adults, num_children, paymentMethodName, publishedReservationId, clientId);
        const id = await this.reservationRepository.createReservation(reservationParams);
        return id;
    }
    
    async cancelReservation(id: number): Promise<void> {
        await this.reservationRepository.cancelReservation(id);
    }

    async calculatePrice(num_rooms: number, checkin: string, checkout: string, publishedReservationId: number): Promise<number> {
        const numDays = this.calculateNumDays(checkin, checkout);
        const publishedReservation = await this.reservationRepository.getPublishedReservationById(publishedReservationId);

        if (!publishedReservation) {
            throw new Error('Oferta de reserva não encontrada1');
        }
        const price = numDays * num_rooms * publishedReservation.price;
        return price;
    }

    async updateReservation(id: number, num_rooms: number, checkin: string, checkout: string, num_adults: number, num_children: number): Promise<void> {
        const reservation = await this.reservationRepository.getReservationById(id);
        if (!reservation) {
            throw new Error('Oferta de reserva não encontrada2');
        }
            reservation.num_rooms = num_rooms;  
            reservation.checkin = checkin;
            reservation.checkout = checkout;
            reservation.num_adults = num_adults;
            reservation.num_children = num_children;

        const availableRooms = await this.checkRoomAvailability(reservation.num_rooms, reservation.checkin, reservation.checkout, reservation.num_adults, reservation.num_children, reservation.publishedReservationId);
        if (!availableRooms) {
            throw new Error('Não há quartos disponíveis para o período selecionado');
        }
        const newPrice = await this.calculatePrice(reservation.num_rooms, reservation.checkin, reservation.checkout, reservation.publishedReservationId);
        reservation.price = newPrice;

        await this.reservationRepository.updateReservation(id, reservation); 
    }

    async getReservationById(id: number): Promise<Reserve> {
        return await this.reservationRepository.getReservationById(id);        
    }

    public async getReservationsByClient(clientId: number): Promise<Reserve[]> {
        return await this.reservationRepository.getReservationsByClient(clientId);
    }

    public async checkRoomAvailability(num_rooms: number, checkin: string, checkout: string, num_adults: number, num_children: number, publishedReservationId: number): Promise<boolean> {
        const publishedReservation = await this.reservationRepository.getPublishedReservationById(publishedReservationId);
        if (!publishedReservation) {
            throw new Error(`Oferta de reserva com ID ${publishedReservationId} não encontrada`);
        }
        const totalPeople = (num_adults + (num_children*0.5));
        if (totalPeople > publishedReservation.people) {
            return false;
        }
        const existingReservations = await this.reservationRepository.getReservationsByPeriod(checkin, checkout, publishedReservationId);
        let reservedRooms = 0;
        for (const reservation of existingReservations) {
            reservedRooms += reservation.num_rooms;
        }
        const availableRooms = publishedReservation.rooms - reservedRooms;
        return availableRooms >= num_rooms;        
    }
    
}