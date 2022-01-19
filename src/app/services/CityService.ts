import { CityRepository } from '../repository/CityRepository';
import { City } from '../entities/City';
import { serializeCity } from '../serialize/CitySerialize';
import { AlreadyExists } from '../errors/alreadyExists';
import { enumUf } from '../utils/enumUF';
import { InvalidInfo } from '../errors/invalidInfo';

const cityRepo = new CityRepository();

export class CityService {
  async create(payload): Promise<City | Error> {
    const { name, state } = payload;
    if (!enumUf.includes(state)) {
      throw new InvalidInfo(state);
    }
    const isEmpty = await cityRepo.get({ name });
    if (isEmpty[1] !== 0) {
      throw new AlreadyExists(name);
    }
    const city = await cityRepo.create(payload);
    return city;
  }

  async get(payload): Promise<unknown> {
    const city = await cityRepo.get(payload);
    const data = serializeCity(city['0'], city['1']);
    return data;
  }
}
