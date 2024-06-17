import { defineFeature, loadFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../../src/app'; // Adjust the path to your app module
import { prismaMock } from '../../setupTests'; // Ensure the path is correct
import { Customer } from '../../src/controllers/client.controller';

const feature = loadFeature('tests/features/client.feature');

const mockClientData = {
  id: 1,
  name: 'Bárbara Alencar',
  email: 'barbara.alencar@gmail.com',
  username: 'barbaralencar',
  password: '@AmoBolo123',
  cpf: '021.957.235-12',
  phone: '(81) 99342-3591',
  birthDate: '1984/09/12',
};

defineFeature(feature, (test) => {
  let response: request.Response;
  let payload: Customer;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const givenUserAlreadyExists = (type: 'email' | 'username') => {
    if (type === 'email') {
      prismaMock.client.findUnique.mockResolvedValue(mockClientData);
    } else if (type === 'username') {
      prismaMock.client.findUnique.mockResolvedValue(mockClientData);
    }
  };

  test('Cadastro Bem-Sucedido de Usuário Cliente', ({ given, when, then }) => {
    given('que eu sou um novo usuário', () => {
      prismaMock.client.create.mockResolvedValue(mockClientData);
    });

    when(
      /^eu envio uma solicitação de cadastro com o nome "(.*)", email "(.*)", username "(.*)", cpf "(.*)", phone "(.*)", birthDate "(.*)" e password "(.*)"$/,
      async (name, email, username, cpf, phone, birthDate, password) => {
        payload = { name, email, username, cpf, phone, birthDate, password } as Customer;
        response = await request(app).post('/client/create').send(payload);
      }
    );

    then('o cadastro deve ser realizado com sucesso', () => {
      expect(response.status).toBe(201);
    });

    then('eu devo receber uma mensagem de confirmação:', (expectedResponse) => {
      const expected = JSON.parse(expectedResponse);
      console.log('Actual response:', response.body);
      expect(response.body.message).toBe(expected.message);
      expect(response.body.user).toMatchObject({
        name: payload.name,
        email: payload.email,
        username: payload.username,
        cpf: payload.cpf,
        phone: payload.phone,
        birthDate: payload.birthDate,
      });
      expect(response.body.user.id).toBeDefined();
    });
  });

  test('Cadastro Mal-Sucedido de Usuário Cliente por E-mail já Cadastrado', ({ given, when, then }) => {
    given('que o e-mail "barbara.alencar@gmail.com" já está cadastrado', () => {
      givenUserAlreadyExists('email');
    });

    when(
      /^eu envio uma solicitação de cadastro com o nome "(.*)", email "(.*)", username "(.*)", cpf "(.*)", phone "(.*)", birthDate "(.*)" e password "(.*)"$/,
      async (name, email, username, cpf, phone, birthDate, password) => {
        payload = { name, email, username, cpf, phone, birthDate, password } as Customer;
        response = await request(app).post('/client/create').send(payload);
      }
    );

    then('o cadastro não deve ser realizado', () => {
      console.log('Actual response status:', response.status);
      console.log('Actual response body:', response.body);
      expect(response.status).toBe(400);
    });

    then('eu devo receber uma mensagem de erro indicando que o e-mail já está em uso:', (expectedResponse) => {
      const expected = JSON.parse(expectedResponse);
      expect(response.body.message).toBe(expected.error);
    });
  });

  test('Cadastro Mal-Sucedido de Usuário Cliente por Usuário já Cadastrado', ({ given, when, then }) => {
    given('que o nome de usuário "barbaralencar" já está cadastrado', () => {
      givenUserAlreadyExists('username');
    });

    when(
      /^eu envio uma solicitação de cadastro com o nome "(.*)", email "(.*)", username "(.*)", cpf "(.*)", phone "(.*)", birthDate "(.*)" e password "(.*)"$/,
      async (name, email, username, cpf, phone, birthDate, password) => {
        payload = { name, email, username, cpf, phone, birthDate, password } as Customer;
        response = await request(app).post('/client/create').send(payload);
      }
    );

    then('o cadastro não deve ser realizado', () => {
      console.log('Actual response status:', response.status);
      console.log('Actual response body:', response.body);
      expect(response.status).toBe(400);
    });

    then('eu devo receber uma mensagem de erro indicando que o nome de usuário já está em uso:', (expectedResponse) => {
      const expected = JSON.parse(expectedResponse);
      expect(response.body.message).toBe(expected.error);
    });
  });

  test('Cadastro Mal-Sucedido de Usuário Cliente por Senha Inválida', ({ given, when, then }) => {
    given('que eu sou um novo usuário', () => {
      // No need to mock the service in this case as the validation fails before calling the service
    });

    when(
      /^eu envio uma solicitação de cadastro com o nome "(.*)", email "(.*)", username "(.*)", cpf "(.*)", phone "(.*)", birthDate "(.*)" e password "(.*)"$/,
      async (name, email, username, cpf, phone, birthDate, password) => {
        payload = { name, email, username, cpf, phone, birthDate, password } as Customer;
        response = await request(app).post('/client/create').send(payload);
      }
    );

    then('o cadastro não deve ser realizado', () => {
      console.log('Actual response status:', response.status);
      console.log('Actual response body:', response.body);
      expect(response.status).toBe(400);
    });

    then('eu devo receber uma mensagem de erro indicando que a senha é inválida:', (expectedResponse) => {
      const expected = JSON.parse(expectedResponse);
      expect(response.body.errors[0].message).toBe(expected.error);
    });
  });
});
