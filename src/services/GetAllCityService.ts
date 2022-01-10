import { getRepository } from "typeorm";
import { City } from "../entities/City";

export class GetAllCityService {
    async execute() {
        const repo = getRepository(City);
 
        const categories = await repo.find();

        return categories;
    }
}