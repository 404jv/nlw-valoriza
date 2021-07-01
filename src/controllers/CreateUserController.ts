import { Request, Response } from "express";
import { BAD_REQUEST, CREATED } from "../helpers/httpHelpers";
import { CreateUserService } from "../services/CreateUserService";
import * as yup from 'yup';
import { HttpError } from "../errors/HttpError";


class CreateUserController {
  async handle(request: Request, response: Response) {
    const schema = yup.object().shape({
      name: yup.string().required(), 
      email: yup.string().email().required(), 
      admin: yup.boolean().notRequired(), 
      password: yup.string().required() 
    });
  
    try {
      schema.validateSync(request.body);
    } catch (error) {
      throw new HttpError({ 
        message: error.errors, 
        statusCode: BAD_REQUEST
      });
    }

    const { name, email, admin, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, admin, password });

    return response.json(user).status(CREATED);
  }
}

export { CreateUserController };
