import {Request, Response} from "express";
import { GetAllPersonService } from "../services/GetAllPersonService";

export class GetAllPersonController {
    async handle(request:Request, response:Response) {
        const service = new GetAllPersonService();

        const person = await service.execute(request.query);

        return response.json(person);
    }
}