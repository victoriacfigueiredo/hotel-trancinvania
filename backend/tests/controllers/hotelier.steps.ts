import { defineFeature, loadFeature, DefineStepFunction } from 'jest-cucumber';
import request from 'supertest';
import app from '../../src/app'; 
import { prismaMock } from '../../setupTests'; 
import { Hotelier } from '@prisma/client';
import bcrypt from 'bcrypt';
import SetupDatabaseTest from '../../src/database/setupDatabaseTest';

const feature = loadFeature('tests/features/hotelier.feature');

let lastId = 0;

const generateId = () => {
    return ++lastId;
};

const mockHashedPassword = '$2b$10$B9j68DzP1ruNn5qyPCqXVO.TOFNGKvldEDasLhfLOAt169ytexgxK';

const createHotelier = async (hotel: string, email: string, password: string) => {
    return {
        id: generateId(),
        name: 'Maria Letícia',
        email: email,
        username: 'mlng',
        password: mockHashedPassword,
        hotel: hotel,
        city: 'Paulista',
        cep: '2621721',
        address: 'Rua vale',
        n_address: '123',
        UF: 'PE',
        cnpj: '123.456.789-01',
    };
};

const createHotelierPayload = (hotel: string, email: string, username: string, password: string, city: string, cep: string, address: string, n_address: string, UF: string, cnpj: string) => {
    return { id: generateId(), hotel, email, username, password, city, cep, address, n_address, UF, cnpj } as Hotelier;
};

defineFeature(feature, (test) => {
    let response: request.Response;
    let hoteliers: Hotelier[] = [];
    const setupDBTest = new SetupDatabaseTest();
    //setupDBTest.resetDatabase();

    beforeEach(async () => {
        jest.clearAllMocks();
        jest.spyOn(bcrypt, 'hash').mockImplementation(async () => mockHashedPassword); // Mock bcrypt.hash to return the same hash
        await setupDBTest.resetDatabase();
    });

    afterEach(async () => {
        hoteliers = [];
        await setupDBTest.resetDatabase();
    });

    const givenNewHotelier = (given: DefineStepFunction) =>
        given('que eu sou um novo hoteleiro', async () => {
            const hotelier = await createHotelier('Polenguito Hotel', 'mleticiagaspar17@gmail.com', '@AmoHotel123');
            hoteliers.push(hotelier);
            prismaMock.hotelier.create.mockResolvedValue(hotelier);
        });

    const whenSendRegisterRequest = (when: DefineStepFunction) =>
        when(
            /^eu envio uma solicitação de cadastro com o hotel "(.*)", email "(.*)", username "(.*)", password "(.*)", cidade "(.*)", cep "(.*)", endereço "(.*)", número do endereço "(.*)", UF "(.*)" e CNPJ "(.*)"$/,
            async (hotel, email, username, password, city, cep, address, n_address, UF, cnpj) => {
                const payload = createHotelierPayload(hotel, email, username, password, city, cep, address, n_address, UF, cnpj);
                response = await request(app).post('/hotelier/create').send(payload);
            },
        );

    const thenRegistrationShouldBeSuccessful = (then: DefineStepFunction) =>
        then('o cadastro deve ser realizado com sucesso', () => {
          //if (response.status !== 201) {
          //  console.error('Erro na solicitação Hotelier:', response.body);
          //}
          expect(response.status).toBe(201);
        });

    const thenShouldReceiveConfirmationMessage = (then: DefineStepFunction) =>
        then('eu devo receber uma mensagem de confirmação:', (expectedResponse) => {
            const expected = JSON.parse(expectedResponse);
            expect(response.body.hotelier).toMatchObject({
                id: hoteliers[0].id,
                name: hoteliers[0].name,
                email: hoteliers[0].email,
                username: hoteliers[0].username,
                password: hoteliers[0].password,
                hotel: hoteliers[0].hotel,
                city: hoteliers[0].city,
                cep: hoteliers[0].cep,
                address: hoteliers[0].address,
                n_address: hoteliers[0].n_address,
                UF: hoteliers[0].UF,
                cnpj: hoteliers[0].cnpj,
            });
            expect(response.body.hotelier.id).toBeDefined();
        });

    test('Cadastro Bem-Sucedido de Usuário Hoteleiro', ({ given, when, then }) => {
        givenNewHotelier(given);
        whenSendRegisterRequest(when);
        thenRegistrationShouldBeSuccessful(then);
        thenShouldReceiveConfirmationMessage(then);
    });
});
