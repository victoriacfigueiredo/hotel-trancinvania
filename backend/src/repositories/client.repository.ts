import { PrismaClient } from '@prisma/client';

export default class ClientRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async createClient(data: any) {
        return await this.prisma.client.create({
            data,
        });
    }

    async findClientByUsername(username: string) {
        return await this.prisma.client.findFirst({
            where: { username: username },
        });
    }

    async findClientByEmail(email: string) {
        return await this.prisma.client.findFirst({
            where: { email: email },
        });
    }

    async findClientByEmailOrUsername(email: string, username: string) {
        return await this.prisma.client.findFirst({
            where: {
                OR: [{ email: email }, { username: username }],
            },
        });
    }

    async findClientById(id: number) {
        return await this.prisma.client.findUnique({
            where: { id: id },
        });
    }

    async ListAll() {
        return await this.prisma.client.findMany();
    }

    async updateClient(id: number, data: any) {
        return await this.prisma.client.update({
            where: { id: id },
            data,
        });
    }

    async deleteClient(id: number) {
        return await this.prisma.client.delete({
            where: { id: id },
        });
    }

    async updateClientPassword(id: number, hashedPassword: string) {
      return await this.prisma.client.update({
        where: { id },
        data: { password: hashedPassword },
      });
    }
}
