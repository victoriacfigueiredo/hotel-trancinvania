import bcrypt from 'bcrypt';
import ClientRepository from '../repositories/client.repository';

export default class ClientService {
  private clientRepository: ClientRepository;

  constructor() {
    this.clientRepository = new ClientRepository();
  }

  async createClient(data: any) {
    // Check if email or username already exists
    const existingClient = await this.clientRepository.findClientByEmailOrUsername(data.email, data.username);
    if (existingClient) {
      throw new Error('Email or username already exists');
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create the client
    const newClient = await this.clientRepository.createClient({ ...data, password: hashedPassword });
    return newClient;
  }
}
