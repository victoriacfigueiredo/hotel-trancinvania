import { PaymentMethod, PrismaClient } from '@prisma/client';
import { paymentMethod } from '../controllers/paymentMethod.controller';

export default class PaymentMethodRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createPaymentMethod(data: any): Promise<number> {
    const payMethod =  await this.prisma.paymentMethod.create({data});
    return payMethod.id
  }

  async getAllPayMethod(client_id : number): Promise<PaymentMethod[]> {
    const paymentMethods = await this.prisma.paymentMethod.findMany({
      where: {
        clientId : client_id
      }
    });
    return paymentMethods as PaymentMethod[];
  }

  async getPayMethodById(id: number): Promise<PaymentMethod> {
    const paymentMethod = await this.prisma.paymentMethod.findUnique({
        where: {
            id : id
        }
    })
    return paymentMethod as PaymentMethod;
  }

  //update by id
  async updatePayMethodById(id: number, params: PaymentMethod): Promise<PaymentMethod> {
    const updatedPayMethod = await this.prisma.paymentMethod.update({
        where: {
            id: id
        },
        data: params
    });
    return updatedPayMethod as PaymentMethod;
  }

  // delete all
  async deleteAllPayMethod(client_id: number): Promise<void> {
    await this.prisma.paymentMethod.deleteMany({
      where : {
        clientId : client_id
      }
    });
  }

  //delete by id
  async deletePayMethodById(payMethod_id: number): Promise<PaymentMethod> {
    const deletedPayMethod = await this.prisma.paymentMethod.delete({
        where: {
            id: payMethod_id,
        },
    });
    return deletedPayMethod as PaymentMethod
  }
  
  async findPaymentMethodByClientAndCard(clientId: number, numCard: string): Promise<number> {
    const paymentMethod = await this.prisma.paymentMethod.findFirst({
      where: { // Use a chave composta
          clientId: clientId,
          numCard: numCard,
      },
      select: {
        id: true,
      },
    });
  
    return paymentMethod?.id ?? -1;
  }

  // //delete by id
  // async deletePromotionById(clientId: number, numCard: string): Promise<void> { 
  //   const deleteId = await this.findPaymentMethodByClientAndCard(clientId, numCard);  
  //   if (deleteId !== -1) {
  //     await this.prisma.paymentMethod.delete({
  //       where: { id: deleteId }
  //     });
  //   } else {
  //     console.warn(`Método de pagamento não encontrado para clientId ${clientId} e numCard ${numCard}`);
  //   }
  // }


  
}