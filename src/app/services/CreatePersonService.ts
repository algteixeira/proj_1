import { getRepository }  from "typeorm";
import { City } from "../entities/City";
import { Person } from "../entities/Person";

type PersonRequest = {
    name: string;
    sex: string;
    birthday: string;
    age: number;
    city_id: string;
};

export class CreatePersonService {
    async execute({name, sex, birthday, age, city_id} : PersonRequest): Promise<Person | Error> {
        const repo = getRepository(Person);
        const cityRepo = getRepository(City);

        if (!await cityRepo.findOne(city_id)) {
            return new Error("unexistent city!");
        }

        const person = repo.create({name, sex, birthday, age, city_id});

        await repo.save(person);

        return person;
    }
}