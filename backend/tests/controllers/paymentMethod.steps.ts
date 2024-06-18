import { defineFeature, loadFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../../src/app';
import { prismaMock } from '../../setupTests';
import { PaymentMethod } from '@prisma/client';

const feature = loadFeature('tests/features/payment-method-management.feature');

const mockPayMethod =  {
    id: 20,
    name: 'Cartão Itaú',
    numCard: '1234567890123456',
    cvv: '123',
    expiryDate: '07/2030',
    type: 'DEBITO',
    clientId: 1,
    cpf: '12345678909',
  };

defineFeature(feature, (test) => {
  let response: request.Response;
  let payload: PaymentMethod;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Cadastrar Método de pagamento com sucesso', ({ given, when, then }) => {
    given('eu estou logado como usuário “Cliente” com login “Matheus” e senha “123”', () => {
      // Mock para criar um novo método de pagamento
      prismaMock.paymentMethod.create.mockResolvedValue({ ...payload });
    });

    when('eu preencho os campos obrigatórios para cadastrar um novo método de pagamento', async () => {
      payload = {
        id : 20,
        name: 'Cartão Itaú',
        numCard: '1234567890123456',
        cvv: 123,
        expiryDate: '07/2030',
        type: 'DEBITO',
        clientId: 1,
        cpf: '12345678909',
      };
      response = await request(app).post('/client/paymentMethods').send(payload);
    });

    then('eu vejo a mensagem "Cartão cadastrado com sucesso!"', () => {
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Cartão cadastrado com sucesso!');
    });

    then('eu vejo "Cartão Itaú" na página "Meus Métodos de Pagamento"', async () => {
      prismaMock.paymentMethod.findMany.mockResolvedValue([{
        id: 1,
        name: 'Cartão Itaú',
        numCard: '1234567890123456',
        cvv: 123,
        expiryDate: '07/2030',
        type: 'DEBITO',
        clientId: 1,
        cpf: '12345678909',
      }]);

      const methodsResponse = await request(app).get('/client/paymentMethods');
      expect(methodsResponse.body).toEqual(expect.arrayContaining([
        expect.objectContaining({ name: "Cartão Itaú" })
      ]));
    });

  test('Scenario 4: Alterar método de pagamento com sucesso', ({ given, when, then }) => {
        given('eu estou logado como usuário “Cliente” com login “Matheus” e senha “123”', () => {
          prismaMock.paymentMethod.findUnique.mockResolvedValue({
            id: 20,
            name: 'Cartão Itaú',
            numCard: '1234567890123456',
            cvv: 123,
            expiryDate: '07/2030',
            type: 'DEBITO',
            clientId: 1,
            cpf: '12345678909',
          });
        });
    
        when('eu seleciono a opção “Alterar” no método de pagamento “Cartão Itaú”', async () => {
          payload = {
            id : 20,
            name: 'Cartão Itaú',
            numCard: '1234567890123456',
            cvv: 123,
            expiryDate: '07/2030',
            type: 'CREDITO',
            clientId: 1,
            cpf: '12345678909',
          };
          response = await request(app).patch('/client/paymentMethods/').send(payload);
        });
    
        then('eu vejo a mensagem "Método de Pagamento Alterado com Sucesso"', () => {
          expect(response.status).toBe(200);
          expect(response.body.message).toBe('Método de Pagamento Alterado com Sucesso');
        });
    
        then('eu vejo “Cartão Itaú” na página “Meus Métodos de Pagamento”', async () => {
          prismaMock.paymentMethod.findMany.mockResolvedValue([{
            id: 20,
            name: 'Cartão Itaú',
            numCard: '1234567890123456',
            cvv: 123,
            expiryDate: '07/2030',
            type: 'CREDITO',
            clientId: 1,
            cpf: '12345678909',
          }]);
    
          const methodsResponse = await request(app).get('/client/paymentMethods');
          expect(methodsResponse.body).toEqual(expect.arrayContaining([
            expect.objectContaining({ name: 'Cartão Itaú', type: 'CREDITO' })
          ]));
        });
      });
    
      test('Scenario 6: Deletar método de pagamento com sucesso', ({ given, when, then }) => {
        given('eu estou logado como usuário “Cliente” com login “Matheus” e senha “123”', () => {
          prismaMock.paymentMethod.findUnique.mockResolvedValue({
            id: 20,
            name: 'Cartão Itaú',
            numCard: '1234567890123456',
            cvv: 123,
            expiryDate: '07/2030',
            type: 'DEBITO',
            clientId: 1,
            cpf: '12345678909',
          });
        });
    
        when('eu seleciono a opção “Deletar” no método de pagamento “Cartão Itaú”', async () => {
          response = await request(app).delete('/client/paymentMethods/1');
        });
    
        then('eu vejo a mensagem “Método de pagamento Deletado com Sucesso”', () => {
          expect(response.status).toBe(200);
          expect(response.body.message).toBe('Método de pagamento Deletado com Sucesso');
        });
    
        then('eu não vejo “Cartão Itaú” na página “Meus Métodos de Pagamento”', async () => {
          prismaMock.paymentMethod.findMany.mockResolvedValue([]); // Empty list after deletion
    
          const methodsResponse = await request(app).get('/client/paymentMethods');
          expect(methodsResponse.body).not.toEqual(expect.arrayContaining([
            expect.objectContaining({ name: 'Cartão Itaú' })
          ]));
        });
      });
    });
});



// import { defineFeature, loadFeature } from 'jest-cucumber';
// import request from 'supertest';
// import app from '../../src/app';
// import { prismaMock } from '../../setupTests';

// const feature = loadFeature('tests/features/payment-method-management.feature');

// defineFeature(feature, (test) => {
//   let response: request.Response;
//   let payload: any;

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('Scenario 1: Cadastrar Método de pagamento com sucesso', ({ given, when, then }) => {
//     given('eu estou logado como usuário “Cliente” com login “Matheus” e senha “123”', () => {
//       // Mock para criar um novo método de pagamento
//       prismaMock.paymentMethod.create.mockResolvedValue({ id: 1, ...payload });
//     });

//     when('eu preencho os campos obrigatórios para cadastrar um novo método de pagamento', async () => {
//       payload = {
//         name: 'Cartão Itaú',
//         numCard: '1234567890123456',
//         cvv: '123',
//         expiryDate: '07/2030',
//         type: 'DEBITO',
//         clientId: 1,
//         cpf: '12345678909',
//       };
//       response = await request(app).post('/client/paymentMethods').send(payload);
//     });

//     then('eu vejo a mensagem “Cartão cadastrado com sucesso!”', () => {
//       expect(response.status).toBe(201); // Status code for resource creation
//       expect(response.body.message).toBe('Cartão cadastrado com sucesso!');
//     });

//     then('eu vejo “Cartão Itaú” na página “Meus Métodos de Pagamento”', async () => {
//       prismaMock.paymentMethod.findMany.mockResolvedValue([{
//         id: 1,
//         name: 'Cartão Itaú',
//         numCard: '1234567890123456',
//         cvv: 123,
//         expiryDate: '07/2030',
//         type: 'DEBITO',
//         clientId: 1,
//         cpf: '12345678909',
//       }]);

//       const methodsResponse = await request(app).get('/client/paymentMethods');
//       expect(methodsResponse.body).toEqual(expect.arrayContaining([
//         expect.objectContaining({ name: 'Cartão Itaú' })
//       ]));
//     });
//   });

//   test('Scenario 4: Alterar método de pagamento com sucesso', ({ given, when, then }) => {
//     given('eu estou logado como usuário “Cliente” com login “Matheus” e senha “123”', () => {
//       prismaMock.paymentMethod.findUnique.mockResolvedValue({
//         id: 1,
//         name: 'Cartão Itaú',
//         numCard: '1234567890123456',
//         cvv: 123,
//         expiryDate: '07/2030',
//         type: 'DEBITO',
//         clientId: 1,
//         cpf: '12345678909',
//       });
//     });

//     when('eu seleciono a opção “Alterar” no método de pagamento “Cartão Itaú”', async () => {
//       payload = {
//         id: 1,
//         type: 'CREDITO', // Change type to credit
//       };
//       response = await request(app).patch('/client/paymentMethods/1').send(payload);
//     });

//     then('eu vejo a mensagem "Método de Pagamento Alterado com Sucesso"', () => {
//       expect(response.status).toBe(200);
//       expect(response.body.message).toBe('Método de Pagamento Alterado com Sucesso');
//     });

//     then('eu vejo “Cartão Itaú” na página “Meus Métodos de Pagamento”', async () => {
//       prismaMock.paymentMethod.findMany.mockResolvedValue([{
//         id: 1,
//         name: 'Cartão Itaú',
//         numCard: '1234567890123456',
//         cvv: 123,
//         expiryDate: '07/2030',
//         type: 'CREDITO',
//         clientId: 1,
//         cpf: '12345678909',
//       }]);

//       const methodsResponse = await request(app).get('/client/paymentMethods');
//       expect(methodsResponse.body).toEqual(expect.arrayContaining([
//         expect.objectContaining({ name: 'Cartão Itaú', type: 'CREDITO' })
//       ]));
//     });
//   });

//   test('Scenario 6: Deletar método de pagamento com sucesso', ({ given, when, then }) => {
//     given('eu estou logado como usuário “Cliente” com login “Matheus” e senha “123”', () => {
//       prismaMock.paymentMethod.findUnique.mockResolvedValue({
//         id: 1,
//         name: 'Cartão Itaú',
//         numCard: '1234567890123456',
//         cvv: 123,
//         expiryDate: '07/2030',
//         type: 'DEBITO',
//         clientId: 1,
//         cpf: '12345678909',
//       });
//     });

//     when('eu seleciono a opção “Deletar” no método de pagamento “Cartão Itaú”', async () => {
//       response = await request(app).delete('/client/paymentMethods/1');
//     });

//     then('eu vejo a mensagem “Método de pagamento Deletado com Sucesso”', () => {
//       expect(response.status).toBe(200);
//       expect(response.body.message).toBe('Método de pagamento Deletado com Sucesso');
//     });

//     then('eu não vejo “Cartão Itaú” na página “Meus Métodos de Pagamento”', async () => {
//       prismaMock.paymentMethod.findMany.mockResolvedValue([]); // Empty list after deletion

//       const methodsResponse = await request(app).get('/client/paymentMethods');
//       expect(methodsResponse.body).not.toEqual(expect.arrayContaining([
//         expect.objectContaining({ name: 'Cartão Itaú' })
//       ]));
//     });
//   });
// });
