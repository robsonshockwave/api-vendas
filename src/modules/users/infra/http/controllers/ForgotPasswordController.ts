import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '../../../services/SendForgotPasswordEmailService';
import { container } from 'tsyringe';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswrordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendForgotPasswrordEmail.execute({ email });

    return response.status(204).json();
  }
}
