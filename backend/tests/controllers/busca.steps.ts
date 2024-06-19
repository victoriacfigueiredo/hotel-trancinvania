import { defineFeature, loadFeature } from "jest-cucumber";
import supertest from "supertest";
import app from "../../src/app";
import PublishedReservationRepository from "../../src/repositories/publishedReservation.repository";
import { di } from "../../src/di";
import { prismaMock } from "../../setupTests";
import SetupDatabaseTest from "../../src/email/setupDatabaseTest";
import { PublishedReservation, Reserve } from "../../src/controllers/reservation.controller";
import { PromotionType } from "../../src/enums/promotion-type.enum";
import { CardType, PaymentMethod } from "@prisma/client";


const feature = loadFeature('tests/features/busca-controller.feature');
const request = supertest(app);

let mockPublishedReservation = {
    id: 1,
    name: "Quarto Standard",
    rooms: 1, 
    people: 3,
    wifi: true,
    breakfast: false,  
    airConditioner: true, 
    parking: true,
    room_service: true,
    price: 450,
    new_price: 450,
    promotion_id: 1,
    hotelier_id: 1, 
}

let mockReservation = {
    id: 1,
    num_rooms: 1,
    checkin: "",
    checkout: "",
    num_adults: 0,
    num_children: 0,
    paymentMethodName: "nome",
    price: 450,
    publishedReservationId: 1,
    clientId: 1,
    paymentMethodId: 1,
}

let mockHotelier = {
    id: 1,
    name: "hoteleiro",
    email: "hoteleiro@gmail.com",
    username: "host",
    password: "1234",
    hotel: "Hotel Attempt",
    adress: "Recife",
    cnpj: "12345678000109",
    reservations: undefined,
}

let mockPromotion = {
    id: 1,
    discount: 0,
    type: PromotionType.ILIMITADA,
    num_rooms: 1,
    reservations: undefined,
}

let mockClient = {
    id: 1,
    name: 'Maria',
    username: 'mari',
    email: 'maria@gmail.com',
    phone: '1234-5678',
    password: '1234',
    cpf: '123.456.789-10',
    birthDate: '2003-10-17'
}

let mockPaymentMethod: PaymentMethod = {
    id: 1,
    name: 'nubank',
    numCard: '1234 5678 9101 1121',
    cvv: 123,
    expiryDate: '30-01',
    type: CardType.CREDITO,
    clientId: 1,
    cpf: "12345678909"
}


defineFeature(feature, (test) => {
    let mockPublishedReservationsRepository: PublishedReservationRepository;
    let response: supertest.Response;
    const setupDBTest = new SetupDatabaseTest();

    beforeEach(async () => {
        // mockPublishedReservationsRepository = di.getRepository<PublishedReservationRepository>(PublishedReservationRepository);
        jest.clearAllMocks();
        await setupDBTest.resetDatabase();
    });

    test('busca bem sucedida, encontrando reservas', ({given, when, then, and}) => {
        given(/^o banco de reservas publicadas possui uma reserva publicada com local "(.*)", quantidade de pessoas "(.*)" e quantidade de quartos "(.*)"$/, 
            async (local, num_people, num_rooms) => {
                mockPublishedReservation = {
                    ...mockPublishedReservation,
                    people: parseInt(num_people),
                    rooms: parseInt(num_rooms)
                }
                prismaMock.publishedReservation.create.mockResolvedValue(mockPublishedReservation);
                
                mockHotelier = {
                    ...mockHotelier,
                    adress: local
                }
                prismaMock.hotelier.create.mockResolvedValue(mockHotelier);
            }
        );

        and(/^o banco de reservas possui uma reserva com data de checkin "(.*)", checkout "(.*)", id de reserva publicada "(.*)", num_adults "(.*)" e num_children "(.*)"$/, async (checkin, checkout, id, num_adults, num_children) => {
            
            mockReservation = {
                ...mockReservation,
                checkin: checkin,
                checkout: checkout,
                publishedReservationId: parseInt(id),
                num_adults: parseInt(num_adults),
                num_children: parseInt(num_children),
            }
            prismaMock.reserve.create.mockResolvedValue(mockReservation);
            
            setupDBTest.setupDatabaseForBuscaTests(mockPublishedReservation, mockReservation, mockHotelier, mockPromotion, mockClient, mockPaymentMethod);
        })

        when(/^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com campo city preenchido com "(.*)", campo num_adults preenchido com "(.*)", campo num_children preenchido com "(.*)", campo num_rooms preenchido com "(.*)", checkin com "(.*)" e checkout com "(.*)"$/, 
            async (url, city, num_adults, num_children, num_rooms, checkin, checkout) => {
                response = await request.post(url).send({
                    city,
                    num_adults: parseInt(num_adults),
                    num_children: parseInt(num_children),
                    num_rooms: parseInt(num_rooms),
                    checkin,
                    checkout
                });
            }
        );

        then(/^a busca deve ser bem sucedida$/, async () => {
            // console.log(response);
            expect(response.status).toBe(200);
            
        })

        and(/^o JSON da resposta deve conter a reserva publicada com city "(.*)", num_people "(.*)" e num_rooms "(.*)"$/, async (city, num_people, num_rooms) => {
            response.body.forEach((reserve) => {
                expect(reserve).toMatchObject({
                    city: city,
                    people: parseInt(num_people),
                    rooms: parseInt(num_rooms)
                })
            })
        });
    })

    test('busca bem sucedida, sem encontrar reservas', ({given, when, then, and}) => {
        given(/^o banco de reservas publicadas não possui uma reserva publicada com local "(.*)", quantidade de pessoas "(.*)" e quantidade de quartos "(.*)"$/, 
            async (local, num_people, num_rooms) => {
                let mockReserva = {
                    ...mockPublishedReservation,
                    people: parseInt(num_people),
                    rooms: parseInt(num_rooms)
                }
                prismaMock.publishedReservation.create.mockResolvedValue(mockReserva);

                mockHotelier = {
                    ...mockHotelier,
                    adress: local
                }
                prismaMock.hotelier.create.mockResolvedValue(mockHotelier);
            }
        );

        when(/^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com campo city preenchido com "(.*)", campo num_adults preenchido com "(.*)", campo num_children preenchido com "(.*)", campo num_rooms preenchido com "(.*)", checkin com "(.*)" e checkout com "(.*)"$/, 
            async (url, city, num_adults, num_children, num_rooms, checkin, checkout) => {
                response = await request.post(url).send({
                    city,
                    num_adults: parseInt(num_adults),
                    num_children: parseInt(num_children),
                    num_rooms: parseInt(num_rooms),
                    checkin,
                    checkout
                });
            }
        );

        then(/^a busca deve ser bem sucedida$/, async () => {
            // console.log(response);
            expect(response.status).toBe(200);
            
        })

        and(/^o JSON da resposta deve estar vazio$/, async (city, num_people, num_rooms) => {
            expect(response.body.length).toEqual(0);
        });
    })

    test('busca mal sucedida (Numero de quartos nao preenchido)', ({given, when, then, and}) => {
        given(/^o banco de reservas publicadas possui uma reserva publicada com local "(.*)", quantidade de pessoas "(.*)" e quantidade de quartos "(.*)"$/, 
            async (local, num_people, num_rooms) => {
                mockPublishedReservation = {
                    ...mockPublishedReservation,
                    people: parseInt(num_people),
                    rooms: parseInt(num_rooms)
                }
                prismaMock.publishedReservation.create.mockResolvedValue(mockPublishedReservation);
                mockHotelier = {
                    ...mockHotelier,
                    adress: local
                }
                prismaMock.hotelier.create.mockResolvedValue(mockHotelier);
            }
        );

        and(/^o banco de reservas possui uma reserva com data de checkin "(.*)", checkout "(.*)", id de reserva publicada "(.*)", num_adults "(.*)" e num_children "(.*)"$/, async (checkin, checkout, id, num_adults, num_children) => {
            mockReservation = {
                ...mockReservation,
                checkin: checkin,
                checkout: checkout,
                publishedReservationId: parseInt(id),
                num_adults: parseInt(num_adults),
                num_children: parseInt(num_children),
            }
            
            prismaMock.reserve.create.mockResolvedValue(mockReservation);
            
            setupDBTest.setupDatabaseForBuscaTests(mockPublishedReservation, mockReservation, mockHotelier, mockPromotion, mockClient, mockPaymentMethod);
            
        })

        when(/^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com campo city preenchido com "(.*)", campo num_adults preenchido com "(.*)", campo num_children preenchido com "(.*)", campo num_rooms não preenchido, checkin com "(.*)" e checkout com "(.*)"$/, 
            async (url, city, num_adults, num_children, checkin, checkout) => {
                response = await request.post(url).send({
                    city,
                    num_adults: parseInt(num_adults),
                    num_children: parseInt(num_children),
                    // num_rooms: parseInt(num_rooms),
                    checkin,
                    checkout
                });
            }
        );

        then(/^a busca deve ser mal sucedida$/, async () => {
            expect(response.status).toBe(400);
        })

        and(/^o JSON da resposta deve conter a mensagem (.*)$/, async () => {
            expect(response.body.message[0]).toEqual("num_rooms is required");
        });
    })

    test('busca mal sucedida (Numero de adultos nao preenchido)', ({given, when, then, and}) => {
        given(/^o banco de reservas publicadas possui uma reserva publicada com local "(.*)", quantidade de pessoas "(.*)" e quantidade de quartos "(.*)"$/, 
            async (local, num_people, num_rooms) => {
                mockPublishedReservation['people'] = parseInt(num_people);
                mockPublishedReservation['rooms'] = parseInt(num_rooms);

                prismaMock.publishedReservation.create.mockResolvedValue(mockPublishedReservation);

                mockHotelier = {
                    ...mockHotelier,
                    adress: local
                }
                prismaMock.hotelier.create.mockResolvedValue(mockHotelier);
            }
        );

        and(/^o banco de reservas possui uma reserva com data de checkin "(.*)", checkout "(.*)", id de reserva publicada "(.*)", num_adults "(.*)" e num_children "(.*)"$/, async (checkin, checkout, id, num_adults, num_children) => {
            
            mockReservation = {
                ...mockReservation,
                checkin: checkin,
                checkout: checkout,
                publishedReservationId: parseInt(id),
                num_adults: parseInt(num_adults),
                num_children: parseInt(num_children),
            }
            prismaMock.reserve.create.mockResolvedValue(mockReservation);
            
            setupDBTest.setupDatabaseForBuscaTests(mockPublishedReservation, mockReservation, mockHotelier, mockPromotion, mockClient, mockPaymentMethod);
        })

        when(/^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com campo city preenchido com "(.*)", campo num_adults não preenchido, campo num_children preenchido com "(.*)", campo num_rooms preenchido com "(.*)", checkin com "(.*)" e checkout com "(.*)"$/, 
            async (url, city, num_children, num_rooms, checkin, checkout) => {
                response = await request.post(url).send({
                    city,
                    // num_adults: parseInt(num_adults),
                    num_children: parseInt(num_children),
                    num_rooms: parseInt(num_rooms),
                    checkin,
                    checkout
                });
            }
        );

        then(/^a busca deve ser mal sucedida$/, async () => {
            expect(response.status).toBe(400);
        })

        and(/^o JSON da resposta deve conter a mensagem "(.*)"$/, async (message) => {
            expect(response.body.message[0]).toEqual(message);
        });
    })
})