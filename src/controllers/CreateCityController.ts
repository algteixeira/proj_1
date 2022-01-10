import { Request, Response } from "express";
import { CreateCityService } from "../services/CreateCityService";


export class CreateCityController {
    async handle(request: Request, response: Response) {
        const {name, state} = request.body;
        
        const service = new CreateCityService();


        const result = await service.execute({name, state});

        if(result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}