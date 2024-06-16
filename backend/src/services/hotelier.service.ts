import bcrypt from 'bcrypt';
import HotelierRepository from "../repositories/hotelier.repository";

export default class HotelierService {
  private hotelierRepository: HotelierRepository;

  constructor() {
    this.hotelierRepository = new HotelierRepository();
  }

  async createHotelier(data: any) {
    // Checar se o email ou usuário já existe
    const existingHotelier = await this.hotelierRepository.findClientByEmailOrUsername(data.email, data.username);
    if (existingHotelier) {
      throw new Error('Email ou usuário já existente.');
    }
    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Criar o hotelier
    const newHotelier = await this.hotelierRepository.createHotelier({ ...data, password: hashedPassword });
    return newHotelier;
  }
}
