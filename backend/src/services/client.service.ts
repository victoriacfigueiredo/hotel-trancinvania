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
}
