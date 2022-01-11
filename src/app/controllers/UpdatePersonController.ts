import {Request, Response} from "express";
import { UpdatePersonService } from "../services/UpdatePersonService";

export class UpdatePersonController {
    async handle(request:Request, response:Response) {
        const { id } = request.params;
        const { name }= request.body;
        const service = new UpdatePersonService();

        const person = await service.execute({id, name});

        if (person instanceof Error) {
            return response.status(404).json(person.message);
        }

        return response.status(200).json(person);
    }
}