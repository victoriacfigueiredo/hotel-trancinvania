import { loadFeature, defineFeature, DefineStepFunction } from "jest-cucumber";
import supertest from "supertest";
import app from "../../src/app";
import { Promotion, PromotionType, PublishedReservation } from "@prisma/client";
import { prismaMock } from "../../setupTests";

const feature = loadFeature('tests/features/promotions.feature');
const request = supertest(app);

const createHotelier = async (hotel: string, email: string, password: string) => {
    return {
        id: 1,
        name: 'Maria Letícia',
        email: email,
        password: password,
        hotel: hotel,
        adress: 'Rua vale',
        cnpj: '123.456.789-01',
    }
}

defineFeature(feature, (test) => {
    let response: supertest.Response;
    let promotions: Promotion[] = [];
    let publishedReservation: PublishedReservation[] = []

    const createPublishedReservation = async (name: string, price: number) => {
        return {
            id: publishedReservation.length + 1,
            name: name,
            rooms: 3,
            people: 3,
            wifi: true,
            breakfast: true,
            airConditioner: true,
            parking: true,
            room_service: true, 
            price: price,
            new_price: price,
            promotion_id: null,
            hotelier_id: 1,
        }
    }

    const createPublishedReservationWithPromotion = async (name: string, price: number, promotion_id: number) => {
        return {
            id: publishedReservation.length + 1,
            name: name,
            rooms: 3,
            people: 3,
            wifi: true,
            breakfast: true,
            airConditioner: true,
            parking: true,
            room_service: true, 
            price: price,
            new_price: price,
            promotion_id: promotion_id,
            hotelier_id: 1,
        }
    }

    const createPromotion = async (discount: number) => {
        return {
            id: promotions.length + 1,
            discount: discount,
            type: PromotionType.LIMITE_QUARTO,
            num_rooms: 3,
        }
    }

    afterEach(() => {
        promotions = [];
        publishedReservation = [];
    });

    const givenHotelierExist = (given: DefineStepFunction) => 
        given(/^existe um usuário "(.*)" do hotel "(.*)" logado com o e-mail "(.*)" e a senha "(.*)"$/, async(user, hotel, email, password) => {
            expect(user).toBe('Hoteleiro');
            const hotelier = await createHotelier(hotel, email, password);
            prismaMock.hotelier.findUnique.mockResolvedValue(hotelier);
        });

    const givenReservationExist = (given: DefineStepFunction) =>
        given (/^está na página "(.*)" da reserva do quarto "(.*)" com o valor da diária por "R\$ (.*)"$/, async(page, room, price) => {
            expect(page).toBe('Cadastro de promoção');
            const reservation = await createPublishedReservation(room, parseFloat(price));
            publishedReservation.push(reservation);
            prismaMock.publishedReservation.findUnique.mockResolvedValue(publishedReservation[0]);
        })
    
    const whenLimitRoomPromotionPost = (when: DefineStepFunction) => // rever
        when (/^uma requisição POST é enviada para "(.*)" com o desconto de "(.*)%", promoção "(.*)" e quantidade de quartos "(.*)"$/, async(url, discount, type, num_rooms) => {
            const new_url = `/reservation/${publishedReservation[0].id}/promotions`;
            response = await request.post(new_url).send({ discount: parseInt(discount, 10), type, num_rooms: parseInt(num_rooms, 10)});
        });

    const thenStatusIsReturned = (then: DefineStepFunction) =>
        then(/^o status da resposta deve ser "(.*)"$/, async(status) => {
            expect(response.status).toBe(parseInt(status, 10));
        })

    const thenReturnedMessage = (then: DefineStepFunction) => 
        then(/^é retornada a mensagem "(.*)"$/, async(message) => {
            expect(response.body.message).toEqual(message);
        })

    const whenLimitRoomPromotionPostWithoutRoom = (when: DefineStepFunction) => // rever
        when (/^uma requisição POST é enviada para "(.*)" com desconto de "(.*)%" e promoção "(.*)"$/, async(url, discount, type) => {
            const new_url = `/reservation/${publishedReservation[0].id}/promotions`;
            response = await request.post(new_url).send({discount: parseInt(discount, 10), type});
        });
    
    const givenPublishedPromotion = (given: DefineStepFunction) =>
        given(/^o quarto "(.*)" tem uma promoção de "(.*)%" cadastrada com o valor promocional de "R\$ (.*)" a diária$/, async (room, discount, price) => {
            const promotion = await createPromotion(parseInt(discount, 10));
            promotions.push(promotion);
            const reservation = await createPublishedReservationWithPromotion(room, price, promotion.id);
            publishedReservation.push(reservation);
        })
    
    const givenNoPromotionReservation = (given: DefineStepFunction) =>
        given(/^o quarto "(.*)" não possui nenhuma promoção cadastrada e seu valor original é "(.*)" a diária$/, async (room, price) => {
            const reservation = await createPublishedReservation(room, parseFloat(price))
            publishedReservation.push(reservation);
        })
    
    const whenPromotionDelete = (when: DefineStepFunction) =>
        when(/^uma requisição DELETE é enviada para "(.*)"$/, async(url) => {
            prismaMock.promotion.findMany.mockResolvedValue(promotions);
            prismaMock.publishedReservation.findMany.mockResolvedValue(publishedReservation);
            response = await request.delete(url);
        })


    const whenUnlimitedPromotionPostAllReservations = (when: DefineStepFunction) => // rever
        when (/^uma requisição POST é enviada para "(.*)" com o desconto de "(.*)%" e promoção "(.*)"$/, async(url, discount, type) => {
            prismaMock.promotion.findMany.mockResolvedValue(promotions);
            prismaMock.publishedReservation.findMany.mockResolvedValue(publishedReservation);
            response = await request.post(url).send({discount: parseInt(discount, 10), type});
        });

    const givenPage = (given: DefineStepFunction) =>
        given (/^está na página "(.*)"$/, async(page) => {
            expect(page).toBe('Reservas publicadas');
        })

    const givenPublishedReservation = (given: DefineStepFunction) =>
        given(/^o quarto "(.*)" está nas reservas publicadas com o valor de "R\$ (.*)" a diária$/, async (room, price) => {
            const reservation = await createPublishedReservation(room, parseFloat(price));
            publishedReservation.push(reservation);
        })

    const whenPromotionPatch = (when: DefineStepFunction) => 
        when (/^uma requisição PATCH é enviada para "(.*)" com desconto de "(.*)%" e promoção "(.*)"$/, async(url, discount, type) => {
            const new_url = `/reservation/${publishedReservation[0].id}/promotions`
            prismaMock.promotion.findUnique.mockResolvedValue(promotions[0]);
            prismaMock.publishedReservation.findUnique.mockResolvedValue(publishedReservation[0]);
            response = await request.patch(new_url).send({discount: parseInt(discount, 10), type});
        });

    const givenNoPromotion = (given: DefineStepFunction) =>
        given(/^não há nenhum quarto com promoção cadastrada$/, async () => {
            const reservation1 = await createPublishedReservation("Flores", 1400.00);
            publishedReservation.push(reservation1);
            const reservation2 = await createPublishedReservation("Jardins", 1500.00);
            publishedReservation.push(reservation2);
        })

    test('Deletar todas as promoções com nenhuma promoção cadastrada', ({ given, when, then, and }) => {
        givenHotelierExist(given);
        givenPage(and);
        givenNoPromotion(and);
        whenPromotionDelete(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
    });
    
    test('Cadastro da promoção realizado com sucesso', ({ given, when, then, and }) => {
        givenHotelierExist(given);
        givenReservationExist(and);
        whenLimitRoomPromotionPost(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
    });

    test('Tentativa de cadastro da promoção com algum campo não preenchido', ({ given, when, then, and }) => {
        givenHotelierExist(given);
        givenReservationExist(and);
        whenLimitRoomPromotionPostWithoutRoom(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
    });

    test('Deletar todas as promoções', ({ given, when, then, and }) => {
        givenHotelierExist(given);
        givenPage(and)
        givenPublishedPromotion(and);
        givenPublishedPromotion(and);
        givenNoPromotionReservation(and);
        whenPromotionDelete(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
        
    });

    test('Cadastrar uma promoção em todas as reservas publicadas', ({ given, when, then, and }) => {
        givenHotelierExist(given);
        givenPage(and);
        givenPublishedReservation(and);
        givenPublishedReservation(and);
        givenPublishedReservation(and);
        whenUnlimitedPromotionPostAllReservations(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
    });

    test('Edição na promoção de uma reserva', ({ given, when, then, and }) => {
        givenHotelierExist(given);
        givenPage(and);
        givenPublishedPromotion(and);
        whenPromotionPatch(when);
        thenStatusIsReturned(then);
        thenReturnedMessage(and);
    });


})