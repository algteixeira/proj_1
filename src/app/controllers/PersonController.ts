import { Request, Response } from 'express';
import { serialize } from '../serialize/PersonSerialize';
import { PersonService } from '../services/PersonService';

const personService = new PersonService();

export class PersonController {
  async create(request: Request, response: Response) {
    try {
      const result = await personService.create(request.body);
      return response.status(201).json(serialize(result));
    } catch (error) {
      return response.status(error.statusCode).json(error.description);
    }
  }

  async get(request: Request, response: Response) {
    const result = await personService.get(request.query);
    return response.status(200).json(result);
  }

  async getById(request: Request, response: Response) {
    try {
      const result = await personService.getById(request.params.id);
      return response.status(200).json(serialize(result));
    } catch (error) {
      return response.status(error.statusCode).json(error.description);
    }
  }

  async delete(request: Request, response: Response) {
    try {
      await personService.delete(request.params.id);
      return response.status(204).json({});
    } catch (error) {
      return response.status(error.statusCode).json(error.description);
    }
  }

  async update(request: Request, response: Response) {
    try {
      const result = await personService.update(request);
      return response.status(200).json(result);
    } catch (error) {
      return response.status(error.statusCode).json(error.description);
    }
  }
}
