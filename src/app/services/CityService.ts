import { CityRepository } from "../repository/CityRepository"; 
import { City } from "../entities/City";

const cityRepo = new CityRepository();

export class CityService {
    async create (payload) : Promise<City | Error> {
        const {name} = payload;
        const isEmpty = await cityRepo.get({name});
        if (isEmpty.length!==0) {
            throw new Error("This city already exists in the database");
        }
        const city = await cityRepo.create(payload);
        return city;
    }

    async get (payload) : Promise<City[]> {
        const city = await cityRepo.get(payload);
        return city;
    }
}