import { getRepository } from 'typeorm';
import { Person } from '../entities/Person';

export class PersonRepository {
  async create(payload) : Promise<Person | Error > {    
    const repo = getRepository(Person);
    const {name, sex, birthday, age, city_id} = payload;
    const person = repo.create({name, sex, birthday, age, city_id});
    await repo.save(person);
    return person;
  }

  async get(payload) : Promise<Person[]> {
    const repo = getRepository(Person);
    const person = await repo.find(payload);
    return person;
  }

  async getById(payload) : Promise<Person> {
    const repo = getRepository(Person);
    const person = await repo.findByIds(payload);
    return person[0];
  }

  async delete(payload) {
    const repo = getRepository(Person);
    return await repo.delete({id: payload})
  }

  async update(payload) : Promise<Person> {
    const repo = getRepository(Person);
    const person = await repo.findOne(payload.id);
    person.name = payload.name ? payload.name : person.name;
    repo.save(person);
    return person;
  }
}