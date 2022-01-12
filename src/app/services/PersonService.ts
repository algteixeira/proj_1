import { PersonRepository } from "../repository/PersonRepository"; 
import { CityRepository } from "../repository/CityRepository"; 
import { Person } from "../entities/Person";
import { getAge } from "../utils/dates";
import { serializePeople } from "../serialize/PersonSerialize";
import { NotFound } from "../errors/notFound";

const personRepo = new PersonRepository();
const cityRepo = new CityRepository();

export class PersonService {
    async create (payload) : Promise<Person | Error> {
        const {name, city_id, birthday} = payload;
        const registrated_city = await cityRepo.get({id: city_id});
        if (registrated_city[1]===0) {
            throw new NotFound(city_id);
        }
        payload.age = getAge(birthday);
        const person = await personRepo.create(payload);
        return person;
    }

    async get (payload) : Promise<Object> {
        const person = await personRepo.get(payload);
        const data = serializePeople(person['0'], person['1']);
        return data;
    }

    async getById (payload) : Promise<Person> {
        const person = await personRepo.getById(payload);
        if (!person) {
            throw new NotFound(payload);
        }
        return person;
    }

    async delete (payload) {
        const deletedPerson = await personRepo.delete(payload);
        if (deletedPerson.affected === 0) {
            throw new NotFound(payload);
        }
        return deletedPerson;
    }

    async update (payload) : Promise<Error | Person >{
        const { id } = payload.params;
        const { name } = payload.body;
        const notEmpty = await personRepo.getById(id);
        if (!notEmpty) {
            throw new NotFound(name);
        }
        const person = await personRepo.update({id, name});
        return person;
    }
}