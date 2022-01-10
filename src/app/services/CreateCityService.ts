import { getRepository } from "typeorm"
import { City } from "../entities/City";

type CityRequest = {
    name: string;
    state: string;
}

export class CreateCityService {

    async execute({name, state}:CityRequest): Promise<City | Error> {
        const repo = getRepository(City);
        // select * from categories where name = "name" limit 1
        if(await repo.findOne({name})) {
            return new Error("Category already exists");
        }

        const category = repo.create({
            name, 
            state
        })

        await repo.save(category);

        return category;
    }
}