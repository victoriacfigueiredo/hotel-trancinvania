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

  async findHotelierByUsername(username: string) {
    return await this.prisma.hotelier.findFirst({
      where: { username: username },
    });
  }

  async findHotelierByEmail(email: string) {
    return await this.prisma.hotelier.findFirst({
      where: { email: email },
    });
  }

  async findHotelierByEmailOrUsername(email: string, username: string) {
    return await this.prisma.hotelier.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username },
        ],
      },
    });
  }


async findHotelierById(id: number) {
    return await this.prisma.hotelier.findUnique({
        where: { id: id },
    });
}

async ListAll() {
    return await this.prisma.hotelier.findMany();
}

async updateHotelier(id: number, data: any) {
    return await this.prisma.hotelier.update({
        where: { id: id },
        data,
    });
}

async deleteHotelier(id: number) {
    return await this.prisma.hotelier.delete({
        where: { id: id },
    });
}

async updateHotelierPassword(id: number, hashedPassword: string) {
  return await this.prisma.hotelier.update({
    where: { id },
    data: { password: hashedPassword },
  });
}

}
