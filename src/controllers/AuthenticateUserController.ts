import { Request, Response } from "express";
import { HttpError } from "../errors/HttpError";
import { UNPROCESSABLE_ENTITY } from "../helpers/httpHelpers";
import { AthenticateUserService } from "../services/AthenticateUserService";

class AuthenticateUserController {

  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email) {
      throw new HttpError({
        message: 'Email incorrect', 
        statusCode: UNPROCESSABLE_ENTITY
      });
    }

    if (!password) {
      throw new HttpError({
        message: 'Password incorrect', 
        statusCode: UNPROCESSABLE_ENTITY
      });
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
