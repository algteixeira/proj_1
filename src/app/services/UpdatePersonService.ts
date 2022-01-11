import { getRepository } from "typeorm";
import { Person } from "../entities/Person";

export class UpdatePersonService {
    async execute({id, name}) {
        const repo = getRepository(Person);
        const person = await repo.findOne(id);
        if (!person) {
            return new Error("Person not found!");
        }
        
        person.name = name ? name : person.name;

        await repo.save(person);

        return person;
    }
}