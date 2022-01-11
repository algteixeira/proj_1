import { PersonRepository } from "../repository/PersonRepository"; 
import { CityRepository } from "../repository/CityRepository"; 
import { Person } from "../entities/Person";
import { getAge } from "../utils/dates";

const personRepo = new PersonRepository();
const cityRepo = new CityRepository();

export class PersonService {
    async create (payload) : Promise<Person | Error> {
        const {name, city_id, birthday} = payload;
        const isEmpty = await personRepo.get({name});
        const registrated_city = await cityRepo.get({id: city_id});
        if (isEmpty.length!==0) {
            throw new Error("This person already exists in the database");
        }
        if (registrated_city.length===0) {
            throw new Error("Invalid city");
        }
        payload.age = getAge(birthday);
        const person = await personRepo.create(payload);
        return person;
    }

    async get (payload) : Promise<Person[]> {
        const person = await personRepo.get(payload);
        return person;
    }

    async getById (payload) : Promise<Person> {
        const person = await personRepo.getById(payload);
        return person;
    }

    async delete (payload) {
        const deletedPerson = await personRepo.delete(payload);
        if (deletedPerson.affected === 0) {
            throw new Error("Unexistent person");
        }
        return deletedPerson;
    }

    async update (payload) : Promise<Error | Person >{
        const { id } = payload.params;
        const { name } = payload.body;
        const notEmpty = await personRepo.getById(id);
        if (!notEmpty) {
            throw new Error("This person doesn't exists in the database!")
        }
        const person = await personRepo.update({id, name});
        return person;
    }
}