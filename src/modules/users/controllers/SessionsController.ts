import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';
import { instanceToInstance } from 'class-transformer';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createSession = new CreateSessionsService();

    const { email, password } = request.body;

    const user = await createSession.execute({ email, password });

    return response.json(instanceToInstance(user));
  }
}
