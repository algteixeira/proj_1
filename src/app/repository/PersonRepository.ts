import { getRepository } from 'typeorm';
import { Person } from '../entities/Person';

export class PersonRepository {
  async create(payload) {
    const repo = getRepository(Person);
    const { name, sex, birthday, age, city_id } = payload;
    const person = repo.create({ name, sex, birthday, city_id });
    await repo.save(person);
    return person;
  }

  async get(payload) {
    const limit = payload.limit || 3;
    const page = payload.page || 1;
    const skip = (page - 1) * limit;
    delete payload.limit;
    delete payload.page;
    const repo = getRepository(Person);
    const data = await repo.findAndCount({
      where: payload,
      take: limit,
      skip: skip,
    });
    return data;
  }

  async getById(payload) {
    const repo = getRepository(Person);
    const person = await repo.findByIds(payload);
    return person[0];
  }

  async delete(payload) {
    const repo = getRepository(Person);
    return await repo.delete({ id: payload });
  }

  async update(payload) {
    const repo = getRepository(Person);
    const person = await repo.findOne(payload.id);
    person.name = payload.name || person.name;
    repo.save(person);
    return person;
  }
}
