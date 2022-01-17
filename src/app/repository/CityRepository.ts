import { getRepository } from 'typeorm';
import { City } from '../entities/City';

class CityRepository {
  async create(payload): Promise<City | Error> {
    const repo = getRepository(City);
    const { name, state } = payload;
    const city = repo.create({ name, state });
    await repo.save(city);
    return city;
  }

  async get(payload): Promise<unknown> {
    const limit = payload.limit || 3;
    const page = payload.page || 1;
    const skip = (page - 1) * limit;
    delete payload.limit;
    delete payload.page;
    const repo = getRepository(City);
    const data = await repo.findAndCount({
      where: payload,
      take: limit,
      skip: skip,
    });
    return data;
  }
}

export { CityRepository };
