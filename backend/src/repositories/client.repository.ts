import { PrismaClient } from '@prisma/client';

export default class ClientRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createClient(data: any) {
    return await this.prisma.client.create({
      data});
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
