import { loadFeature, defineFeature, DefineStepFunction } from "jest-cucumber";
import supertest from "supertest";
import app from "../../src/app";
import { prismaMock } from "../../setupTests";
import { CardType, PaymentMethod } from "@prisma/client";

const feature = loadFeature('tests/features/payMethod.feature');
const request = supertest(app);

// Função auxiliar para criar um método de pagamento simulado
const createPaymentMethod = (name: string, numCard: string, cvv: number, expiryDate: string, type: CardType, cpf: string): Omit<PaymentMethod, 'id'> => {
    return {
        name,
        numCard,
        cvv,
        expiryDate,
        type,
        cpf,
        clientId: 1, // Assumimos que o ID do cliente é 1 para simplicidade
    };
};

defineFeature(feature, (test) => {
    let response: supertest.Response;
    let paymentMethods: PaymentMethod[] = [];

    afterEach(() => {
        paymentMethods = [];
    });

    const givenNoPaymentMethod = (given: DefineStepFunction) =>
        given(/^nenhum metodo de pagamento esta cadastrado$/, async () => {
            paymentMethods = [];
            prismaMock.paymentMethod.findMany.mockResolvedValue([]);
        });

        const whenCreateNewPaymentMethod = (when: DefineStepFunction) =>
            when(  /^cadastro um novo metodo de pagamento com nome "(.*?)", numCard "(.*?)", cvv "(.*?)", validade "(.*?)", tipo "(.*?)", cpf "(.*?)"$/,
                async (name: string, numCard: string, cvv: string, expiryDate: string, type: CardType, cpf: string) => {
                const newPaymentMethod = createPaymentMethod(name, numCard, parseInt(cvv), expiryDate, type, cpf);
                const savedPaymentMethod: PaymentMethod = { ...newPaymentMethod, id: paymentMethods.length + 1 };
                paymentMethods.push(savedPaymentMethod);
                prismaMock.paymentMethod.create.mockResolvedValue(savedPaymentMethod);
                response = await request.post('/client/paymentMethods').send(newPaymentMethod);
            });
        
    const thenSeeSuccessMessage = (then: DefineStepFunction) =>
        then(/^vejo a mensagem "(.*)"$/, async (message) => {
            expect(response.body.message).toEqual(message);
        });

    const thenSeePaymentMethodOnList = (then: DefineStepFunction) =>
        then(/^vejo "(.*)" na lista de métodos de pagamento$/, async (name) => {
            prismaMock.paymentMethod.findMany.mockResolvedValue(paymentMethods);
            const res = await request.get('/client/paymentMethods');
            expect(res.body.some((method: PaymentMethod) => method.name === name)).toBe(true);
        });

    const givenPaymentMethodExists = (given: DefineStepFunction) =>
        given(/^o método de pagamento "(.*)" está cadastrado com o tipo "(.*)"$/, async (name, type) => {
            const existingPaymentMethod: PaymentMethod = {
                ...createPaymentMethod(name, '4111111111111111', 123, '07/2030', type as CardType, '12345678909'),
                id: paymentMethods.length + 1,
            };
            paymentMethods.push(existingPaymentMethod);
            prismaMock.paymentMethod.findMany.mockResolvedValue(paymentMethods);
        });

    const givenPaymentMethodExistsDelete = (given: DefineStepFunction) =>
      given(/^o método de pagamento "(.*)" está cadastrado$/, async (name) => {
          const existingPaymentMethod: PaymentMethod = {
              ...createPaymentMethod(name, '4111111111111111', 123, '07/2030', 'CREDITO', '12345678909'),
              id: paymentMethods.length + 1,
          };
          paymentMethods.push(existingPaymentMethod);
          prismaMock.paymentMethod.findMany.mockResolvedValue(paymentMethods);
      });

    const whenUpdatePaymentMethod = (when: DefineStepFunction) =>
        when(/^altero o método de pagamento "(.*)" para o tipo "(.*)"$/, async (name, newType) => {
           console.log(paymentMethods[0])
            const paymentMethod = paymentMethods.find(method => method.name === name);
            if (paymentMethod) {
                paymentMethod.type = newType as CardType;
                prismaMock.paymentMethod.update.mockResolvedValue(paymentMethod);
                response = await request.patch(`/client/paymentMethods/${paymentMethod.id}`).send(paymentMethod);
            }
        });

    const thenSeeUpdatedPaymentMethodOnList = (then: DefineStepFunction) =>
        then(/^vejo "(.*)" com o tipo "(.*)" na lista de métodos de pagamento$/, async (name, type) => {
            prismaMock.paymentMethod.findMany.mockResolvedValue(paymentMethods);
            const res = await request.get('/client/paymentMethods');
            expect(res.body.some((method: PaymentMethod) => method.name === name && method.type === type)).toBe(true);
        });

    const whenDeletePaymentMethod = (when: DefineStepFunction) =>
      when(/^deleto o método de pagamento "(.*)"$/, async (name) => {
          const paymentMethod = paymentMethods.find(method => method.name === name);
          if (paymentMethod) {
              paymentMethods = paymentMethods.filter(method => method.name !== name);
              prismaMock.paymentMethod.delete.mockResolvedValue(paymentMethod);
              response = await request.delete(`/client/paymentMethods/${paymentMethod.id}`);
          }
      });


    const thenDoNotSeePaymentMethodOnList = (and: DefineStepFunction) =>
      and(/^não vejo "(.*)" na lista de métodos de pagamento$/, async (name) => {
          prismaMock.paymentMethod.findMany.mockResolvedValue(paymentMethods);
          const res = await request.get('/client/paymentMethods');
          expect(res.body.some((method: PaymentMethod) => method.name === name)).toBe(false);
      });


    test('Cadastrar Metodo de pagamento com sucesso', ({ given, when, then }) => {
        givenNoPaymentMethod(given);
        whenCreateNewPaymentMethod(when);
        thenSeeSuccessMessage(then);
        thenSeePaymentMethodOnList(then);
    });

    test('Alterar metodo de pagamento com sucesso', ({ given, when, then }) => {
        givenPaymentMethodExists(given);
        whenUpdatePaymentMethod(when);
        thenSeeSuccessMessage(then);
        thenSeeUpdatedPaymentMethodOnList(then);
    });

    test('Deletar Metodo de Pagamento com Sucesso', ({ given, when, then, and }) => {
      givenPaymentMethodExistsDelete(given);
      whenDeletePaymentMethod(when);
      thenSeeSuccessMessage(then);
      thenDoNotSeePaymentMethodOnList(and);
  });

});


