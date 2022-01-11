import {Request, Response} from "express";
import { CreatePersonService } from "../services/CreatePersonService";

export class CreatePersonController {
    async handle(request:Request, response:Response) {
        const {name, sex, birthday, city_id} = request.body;
        const service = new CreatePersonService();
        try {
            const result = await service.execute({
                name,
                sex,
                birthday,
                city_id
            });
            return response.status(201).json(result);
        } catch(error) {
            return response.status(400).json(error);
        }
    }
}