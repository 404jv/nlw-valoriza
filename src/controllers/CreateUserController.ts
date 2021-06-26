import { Request, Response } from "express";
import { CREATED } from "../helpers/httpHelpers";
import { CreateUserService } from "../services/CreateUserService";


class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, admin, password } = request.body;
    
    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, admin, password });

    return response.json(user).status(CREATED);
  }
}

export { CreateUserController };
