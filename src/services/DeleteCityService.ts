import { getRepository } from "typeorm";
import { City } from "../entities/City";

export class DeleteCityService {
    async execute(id: string) {
        const repo = getRepository(City);
        if (!await repo.findOne(id)) {
            return new Error("City doesn't exists!");
        }

        await repo.delete(id);
    }
}