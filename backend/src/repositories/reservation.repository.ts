import { PrismaClient } from "@prisma/client";
import { Reservation, PublishedReservation, Client, PaymentMethod} from "../controllers/reservation.controller";

export default class ReservationRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async cancelReservation(id: number): Promise<void> {
        try {
            await this.prisma.reservation.delete({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async getPublishedReservationById(publishedReservationId: number): Promise<PublishedReservation>{
        try {
            const publishedReservation = await this.prisma.publishedReservation.findUnique({
                where: {
                    id: publishedReservationId
                }
            })
            if (!publishedReservation) {
                throw new Error('Oferta de reserva não encontrada');
            }

            return publishedReservation as PublishedReservation;
        } catch (error) {
            throw error;
        }
    }
    async getClientById(clientId: number): Promise<Client>{
        try {
            const client = await this.prisma.client.findUnique({
                where: {
                    id: clientId
                }
            })
            if (!client) {
                throw new Error('Usuário não encontrado');
            }

            return client as Client;
        } catch (error) {
            throw error;
        }
    }
    async getPaymentMethod(clientId: number): Promise<PaymentMethod[]>{
        try {
            const paymentMethod = await this.prisma.paymentMethod.findMany({
                where: {
                    clientId: clientId,
                }
            })
            if (!paymentMethod) {
                throw new Error('Método de pagamento não encontrado');
            }

            return paymentMethod as PaymentMethod[];
        } catch (error) {
            throw error;
        }
    }
    async getReservationById(id: number): Promise<Reservation>{
        try {
            const reservation = await this.prisma.reservation.findUnique({
                where: {
                    id: id
                }
            })
            if (!reservation) {
                throw new Error('Reserva não encontrada');
            }

            return reservation as Reservation;
        } catch (error) {
            throw error;
        }
    }
    async getReservationsByClient(clientId: number): Promise<Reservation[]> {
        try {
            const reservations = await this.prisma.reservation.findMany({
                where: {
                    clientId: clientId
                }
            });

            if (!reservations) {
                throw new Error('Nenhuma reserva encontrada para o cliente especificado');
            }

            return reservations as Reservation[];
        } catch (error) {
            throw error;
        }
    }
    async createReservation(params: Reservation) : Promise<{id: number}>{
        try {
            const result = await this.prisma.reservation.create({data: params})
            
            return { id: result.id };
        } catch (error) {
            throw error;
        }
    }
    async getReservationsByPeriod(checkin: string, checkout: string, publishedReservationId: number): Promise<Reservation[]> {
        try {
            const reservations = await this.prisma.reservation.findMany({
                where: {
                    publishedReservationId: publishedReservationId,
                    checkin: {
                        lte: checkout // Check-in antes ou no dia do check-out desejado
                    },
                    checkout: {
                        gte: checkin // Check-out depois ou no dia do check-in desejado
                    }
                }
            });

            if (!reservations) {
                throw new Error('Nenhuma reserva encontrada para o período especificado');
            }

            return reservations as Reservation[];
        } catch (error) {
            throw error;
        }
    }
    async updateReservation(id: number, params: Partial<Reservation>): Promise<void> {
        try {
            await this.prisma.reservation.update({
                where: {
                    id: id
                },
                data: params
            });
        } catch (error) {
            throw error;
        }
    }
}
