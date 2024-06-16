import HotelierRepository from "../repositories/hotelier.repository";

export default class HotelierService {
  private hotelierRepository: HotelierRepository;

  constructor() {
    this.hotelierRepository = new HotelierRepository();
  }

  async createHotelier(data: any) {
    return await this.hotelierRepository.createHotelier(data);
  }
}
