import { PrismaClient } from '@prisma/client';

export default class ClientRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createCustomer(data: any) {
    return await this.prisma.client.create({
      data: {
        ...data,
        birthDate: new Date(data.birthDate),
      },
    });
  }
}
