import bcrypt from 'bcrypt';
import ClientRepository from '../repositories/client.repository';
import jwt from 'jsonwebtoken';
import EmailService from './email.service';
import { generateRecoveryEmailHtml } from '../utils/generateRecoveryEmailHtml';

export default class ClientService {
    private clientRepository: ClientRepository;

    constructor() {
        this.clientRepository = new ClientRepository();
    }

    async createClient(data: any) {
        // Checar se o email ou usuário já existe
        const existingClient = await this.clientRepository.findClientByEmailOrUsername(
            data.email,
            data.username,
        );
        if (existingClient) {
            throw new Error('E-mail ou nome de usuário já existe.');
        }

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Criar o cliente
        const newClient = await this.clientRepository.createClient({
            ...data,
            password: hashedPassword,
        });
        return newClient;
    }

    async getClientById(id: number) {
        return await this.clientRepository.findClientById(id);
    }

    async updateClient(id: number, data: any) {
        const existingClient = await this.clientRepository.findClientByEmailOrUsername(
            data.email,
            data.username,
        );
        const dataClient = await this.clientRepository.findClientById(id);
        //const dataClient = this.getClientById(id);
        if (existingClient && existingClient.id !== id) {
            throw new Error('Email ou CPF já existente');
        }

        if (data && dataClient && data.password && dataClient.password) {
            const cpfDigits = dataClient.cpf.replace(/[^\d]/g, '');
            if (
                data.password.includes(dataClient.name) ||
                data.password.includes(cpfDigits) ||
                data.password.includes(dataClient.birthDate)
            ) {
                throw new Error('A senha não pode conter seu nome, CPF ou data de nascimento');
            }
            data.password = await bcrypt.hash(data.password, 10);
        }

        const updatedClient = await this.clientRepository.updateClient(id, data);
        if (!updatedClient) {
            throw new Error('Cliente não encontrado');
        }
        return updatedClient;
    }

    async deleteClient(id: number) {
        const deletedClient = await this.clientRepository.deleteClient(id);
        if (!deletedClient) {
            throw new Error('Cliente não encontrado');
        }
    }

    async getAllClients() {
        return await this.clientRepository.ListAll();
    }

    async generatePasswordResetToken(email: string) {
        const client = await this.clientRepository.findClientByEmail(email);
        if (!client) {
            throw new Error('Cliente não encontrado');
        }

        const token = jwt.sign({ id: client.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        const html = generateRecoveryEmailHtml(token);
        await EmailService.sendEmail(email, 'Recupere sua Senha', undefined, html);
    }

    async resetPassword(token: string, newPassword: string) {
        try {
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
            const dataClient = await this.clientRepository.findClientById(decoded.id);
            if (!dataClient) {
                throw new Error('Cliente não encontrado');
            }
            const cpfDigits = dataClient.cpf.replace(/[^\d]/g, '');
            if (
                newPassword.includes(dataClient.name) ||
                newPassword.includes(cpfDigits) ||
                newPassword.includes(dataClient.birthDate)
            ) {
                throw new Error('A senha não pode conter seu nome, CPF ou data de nascimento');
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await this.clientRepository.updateClientPassword(decoded.id, hashedPassword);
        } catch (err) {
            throw new Error('Invalid or expired token');
        }
    }
}
