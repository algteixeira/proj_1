import {Request, Response} from "express";
import { GetPersonByIdService } from "../services/GetPersonByIdService";

export class GetPersonByIdController {
    async handle(request:Request, response:Response) {
        const { id } = request.params;
        const service = new GetPersonByIdService();

        const person = await service.execute(id);

        if (person instanceof Error) {
            return response.status(404).json(person.message);
        }

        return response.status(200).json(person);
    }
}