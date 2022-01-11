import { Request, Response } from "express";
import { PersonService } from "../services/PersonService";

const personService = new PersonService();

export class PersonController {
    async create (request: Request, response: Response) {
        try {
            const result = await personService.create(request.body);
            return response.status(201).json(result);
        } catch (err) {
            return response.status(400).json(err.message);
        }
    }

    async get (request: Request, response: Response) {
        try {
            const result = await personService.get(request.query);           
            return response.status(200).json(result);
        } catch (error) {
            return response.status(400).json(error.message);
        }
    }

    async getById (request: Request, response: Response) {
        try {
            const result = await personService.getById(request.params.id);
            return response.status(200).json(result);
        } catch (error) {
            return response.status(400).json(error.message);
        }
    }

    async delete (request: Request, response: Response) {
        try {
            const result = await personService.delete(request.params.id);
            return response.status(204).json(result);
        } catch (error) {
            return response.status(404).json(error.message);
        }
    }

    async update (request: Request, response: Response) {
        try {
            const result = await personService.update(request);
            return response.status(200).json(result);
        } catch (error) {
            return response.status(404).json(error.message);
        }
    }
}