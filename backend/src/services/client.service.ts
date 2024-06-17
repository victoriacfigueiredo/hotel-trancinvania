import bcrypt from 'bcrypt';
import ClientRepository from '../repositories/client.repository';

export default class ClientService {
  private clientRepository: ClientRepository;

  constructor() {
    this.clientRepository = new ClientRepository();
  }

  async createClient(data: any) {
    // Checar se o email ou usuário já existe
    const existingClient = await this.clientRepository.findClientByEmailOrUsername(data.email, data.username);
    if (existingClient) {
      throw new Error('Email ou usuário já existente.');
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Criar o cliente
    const newClient = await this.clientRepository.createClient({ ...data, password: hashedPassword });
    return newClient;
  }

  async getClientById(id: number) {
    return await this.clientRepository.findClientById(id);
}

async updateClient(id: number, data: any) {
  const existingClient = await this.clientRepository.findClientByEmailOrUsername(data.email, data.username);
  const dataClient = await this.clientRepository.findClientById(id);
  //const dataClient = this.getClientById(id);
  if (existingClient && existingClient.id !== id) {
      throw new Error('Email ou CPF já existente');
  }

  if (data && dataClient && data.password && dataClient.password) {
      if (data.password === dataClient.name || data.password === dataClient.cpf || data.password === dataClient.birthDate) {
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
}
