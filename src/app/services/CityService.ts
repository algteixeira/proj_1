import { CityRepository } from "../repository/CityRepository"; 
import { City } from "../entities/City";
import { serializeCity } from "../serialize/CitySerialize";

const cityRepo = new CityRepository();

export class CityService {
    async create (payload) : Promise<City | Error> {
        const {name} = payload;
        const isEmpty = await cityRepo.get({name});
        if (isEmpty[1]!==0) {
            throw new Error("This city already exists in the database");
        }
        const city = await cityRepo.create(payload);
        return city;
    }

    async get (payload) : Promise<Object> {
        const city = await cityRepo.get(payload);
        const data = serializeCity(city['0'], city['1']);
        return data;
    }
}