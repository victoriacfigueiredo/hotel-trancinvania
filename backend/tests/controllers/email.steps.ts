import { loadFeature, defineFeature, DefineStepFunction } from "jest-cucumber";
import supertest from "supertest";
import app from "../../src/app";
import { Client, Promotion, PromotionType, PublishedReservation, Reserve } from "@prisma/client";
import { prismaMock } from "../../setupTests";

const feature = loadFeature('tests/features/email.feature');
const request = supertest(app);

const client = async (email: string, password: string) => {
    return {
        id: 1,
        name: 'Maria',
        email: email,
        phone: '1234-5678',
        password: password,
        cpf: '123.456.789-10',
        birthDate: '2003-10-17'
    }
}

const reservation = async (publishedReservationId: number) => {
    return {
        id: 1,
        num_rooms: 2,
        checkin: '2024-07-15',
        checkout: '2024-07-20',
        num_adults: 2,
        num_children: 1,
        paymentMethodName: 'nubank',
        price: 200.00,
        clientId: 1,
        publishedReservationId: publishedReservationId,
        paymentMethodId: 1,
    }
}

defineFeature(feature, (test) => {
    let response: supertest.Response;
    let clients: Client[] = [];
    let reserves: Reserve[] = []

    const givenClientExist = (given: DefineStepFunction) => 
        given(/^existe um usuário "(.*)" logado com o e-mail "(.*)" e a senha "(.*)"$/, async(user, email, password) => {
            expect(user).toBe('Cliente');
            const clientUser = await client(email, password);
            clients.push(clientUser);
            prismaMock.client.findUnique.mockResolvedValue(clientUser);
        });

    const givenPage = (given: DefineStepFunction) => 
        given(/^está na página "(.*)" do quarto com id "(.*)"$/, async(page, id) => {
            expect(page).toBe('Realizar reserva');
            const reserve = await reservation(parseInt(id, 10));
            reserves.push(reserve);
        });
    
    const givenReservations = (given: DefineStepFunction) => 
        given(/^o quarto de id "(.*)" está na listagem das reservas feitas por ele$/, async(id) => {
            const reserve = await reservation(parseInt(id, 10));
            reserves.push(reserve);
        });
    
    const whenReservationPost = (when: DefineStepFunction) => // rever
        when (/^uma requisição POST é enviada para "(.*)" com os dados da reserva$/, async(url) => {
            prismaMock.reserve.findUnique.mockResolvedValue(reserves[0]);
            response = await request.post(url).send({num_rooms: reserves[0].num_rooms, 
                checkin: reserves[0].checkin,
                checkout: reserves[0].checkout,
                num_adults: reserves[0].num_adults,
                num_children: reserves[0].num_children,
                paymentMethodName: reserves[0].paymentMethodName,
            });
        });
    
    const thenStatusIsReturned = (then: DefineStepFunction) =>
        then(/^o status da resposta deve ser "(.*)"$/, async(status) => {
            expect(response.status).toBe(parseInt(status, 10));
        })

    const thenReturnedMessage = (then: DefineStepFunction) => 
        then(/^é retornada a mensagem "(.*)"$/, async(message) => {
            expect(response.body.message).toEqual(message);
        })

    const whenReservationUpdate = (when: DefineStepFunction) => // rever
        when (/^uma requisição PUT é enviada para "(.*)" com os dados da reserva$/, async(url) => {
            prismaMock.reserve.findUnique.mockResolvedValue(reserves[0]);
            response = await request.put(url).send({num_rooms: reserves[0].num_rooms, 
                checkin: '2024-07-01',
                checkout: '2024-07-04',
                num_adults: reserves[0].num_adults,
                num_children: reserves[0].num_children,
                paymentMethodName: reserves[0].paymentMethodName,
            });
        });
    
    const whenReservationDelete = (when: DefineStepFunction) => // rever
        when (/^uma requisição DELETE é enviada para "(.*)"$/, async(url) => {
            response = await request.delete(url);
        });

    test('Finalização da reserva com sucesso', ({given, when, then, and}) => {
        givenClientExist(given);
        givenPage(and);
        whenReservationPost(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
    })

    test('Edição da reserva', ({given, when, then, and}) => {
        givenClientExist(given);
        givenReservations(and);
        whenReservationUpdate(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
    })

    test('Cancelamento da reserva', ({given, when, then, and}) => {
        givenClientExist(given);
        givenReservations(and);
        whenReservationDelete(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
    })
    


});