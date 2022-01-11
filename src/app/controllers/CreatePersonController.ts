import {Request, Response} from "express";
import { CreatePersonService } from "../services/CreatePersonService";

export class CreatePersonController {
    async handle(request:Request, response:Response) {
        const {name, sex, birthday, city_id} = request.body;
        const service = new CreatePersonService();
        const result = await service.execute({
            name,
            sex,
            birthday,
            city_id
        });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }
        return response.status(201).json(result);
    }
}