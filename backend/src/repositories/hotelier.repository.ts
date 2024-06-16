import { PrismaClient } from '@prisma/client';

export default class HotelierRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createHotelier(data: any) {
    return await this.prisma.hotelier.create({
      data,
    });
  }

  async findClientByEmailOrUsername(email: string, username: string) {
    return await this.prisma.client.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username },
        ],
      },
    });
  }
}
