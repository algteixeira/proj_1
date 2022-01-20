import { CityRepository } from '../repository/CityRepository';
import { City } from '../entities/City';
import { AlreadyExists } from '../errors/alreadyExists';

const cityRepo = new CityRepository();

export class CityService {
  async create(payload): Promise<City | Error> {
    const { name } = payload;
    const isEmpty = await cityRepo.get({ name });
    if (isEmpty[1] !== 0) {
      throw new AlreadyExists(name);
    }
    const city = await cityRepo.create(payload);
    return city;
  }

  async get(payload): Promise<City[]> {
    const city = await cityRepo.get(payload);
    return city;
  }
}
