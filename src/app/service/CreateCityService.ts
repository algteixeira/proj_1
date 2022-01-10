import { getRepository } from "typeorm";
import { City } from "../entities/City";

type CityRequest = {
    name: string,
    state: string
}

export class CreateCityService {

    async execute({ name, state } : CityRequest) : Promise <City | Error> {
        const repo = getRepository(City);
        
        if (await repo.findOne({name})) {
            return new Error ("It already exists!");
        }

        const city = repo.create({ 
            name,
            state
        })

        await repo.save(city);

        return city;
    }

}