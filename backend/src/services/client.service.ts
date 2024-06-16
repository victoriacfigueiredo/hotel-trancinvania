import ClientRepository from '../repositories/client.repository';

export default class ClientService {
  private clientRepository: ClientRepository;

  constructor() {
    this.clientRepository = new ClientRepository();
  }

  async createCustomer(data: any) {
    return await this.clientRepository.createCustomer(data);
  }
}
