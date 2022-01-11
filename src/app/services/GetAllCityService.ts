import { getRepository } from "typeorm";
import { City } from "../entities/City";

export class GetAllCityService {
    async execute(obj) {
        const repo = getRepository(City);
        const cities = await repo.find(obj);

        return cities;
    }
}