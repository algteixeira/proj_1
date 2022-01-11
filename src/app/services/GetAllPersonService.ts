import { getRepository } from "typeorm";
import { Person } from "../entities/Person";

export class GetAllPersonService {
    async execute(obj) {
        const repo = getRepository(Person);
        const person = await repo.find(obj);

        return person;
    }
}