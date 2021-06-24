import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { AthenticateUserService } from "../services/AthenticateUserService";

const UNPROCESSABLE_ENTITY = 422;

class AuthenticateUserController {

  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email) {
      throw new AppError('Email incorrect', UNPROCESSABLE_ENTITY);
    }

    if (!password) {
      throw new AppError('Password incorrect', UNPROCESSABLE_ENTITY);
    }

    const authenticateUserService = new AthenticateUserService();

    const token = await authenticateUserService.execute({
      email,
      password
    });

    return response.json(token);
  }
}

export { AuthenticateUserController };
