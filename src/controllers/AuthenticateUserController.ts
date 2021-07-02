import { Request, Response } from "express";
import { HttpError } from "../errors/HttpError";
import { BAD_REQUEST, UNPROCESSABLE_ENTITY } from "../helpers/httpHelpers";
import { AthenticateUserService } from "../services/AthenticateUserService";
import * as yup from 'yup';

class AuthenticateUserController {

  async handle(request: Request, response: Response) {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    try {
      schema.validateSync(request.body);
    } catch (error) {
      throw new HttpError({
        message: error.errors,
        statusCode: BAD_REQUEST
      });
    }

    const { email, password } = request.body;

    const authenticateUserService = new AthenticateUserService();

    const token = await authenticateUserService.execute({
      email,
      password
    });

    return response.json(token);
  }
}

export { AuthenticateUserController };
