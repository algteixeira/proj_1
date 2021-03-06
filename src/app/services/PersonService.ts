import { PersonRepository } from '../repository/PersonRepository';
import { CityRepository } from '../repository/CityRepository';
import { Person } from '../entities/Person';
import { serializePeople } from '../serialize/PersonSerialize';
import { NotFound } from '../errors/notFound';

const personRepo = new PersonRepository();
const cityRepo = new CityRepository();

export class PersonService {
  async create(payload) {
    const { city_id } = payload;
    const registratedCity = await cityRepo.get({ id: city_id });
    if (registratedCity[1] === 0) {
      throw new NotFound(city_id);
    }
    const person = await personRepo.create(payload);
    return person;
  }

  async get(payload) {
    const person = await personRepo.get(payload);
    const data = serializePeople(person['0'], person['1']);
    return data;
  }

  async getById(payload) {
    const person = await personRepo.getById(payload);
    if (!person) {
      throw new NotFound(payload);
    }
    return person;
  }

  async delete(payload) {
    const deletedPerson = await personRepo.delete(payload);
    if (deletedPerson.affected === 0) {
      throw new NotFound(payload);
    }
  }

  async update(payload) {
    const { id } = payload.params;
    const { name } = payload.body;
    const notEmpty = await personRepo.getById(id);
    if (!notEmpty) {
      throw new NotFound(name);
    }
    const person = await personRepo.update({ id, name });
    return person;
  }
}
