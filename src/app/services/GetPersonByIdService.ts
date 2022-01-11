import { getRepository } from "typeorm";
import { Person } from "../entities/Person";

export class GetPersonByIdService {
    async execute(id) {
        const repo = getRepository(Person);
        const person = await repo.findOne(id);
        if (!person) {
            return new Error("unexistent person!");
        }

        return person;
    }
}