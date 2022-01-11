import { getRepository } from 'typeorm';
import { City } from '../entities/City';


class CityRepository {
  async create(payload) : Promise<City | Error > {    
    const repo = getRepository(City);
    const {name, state} = payload;
    const city = repo.create({name, state});
    await repo.save(city);
    return city;
  }

  async get(payload) : Promise<City[]> {
    const repo = getRepository(City);
    const city = await repo.find(payload);
    return city;
  }
}

export { CityRepository };