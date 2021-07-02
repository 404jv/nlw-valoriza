import { Request, Response } from "express";
import { CreateTagService } from "../services/CreateTagService";
import * as yup from 'yup';
import { HttpError } from "../errors/HttpError";
import { BAD_REQUEST } from "../helpers/httpHelpers";

class CreateTagController {

  async handle(request: Request, response: Response) {
    const schema = yup.object().shape({
      name: yup.string().required(),
    });

    try {
      schema.validateSync(request.body);
    } catch (error) {
      throw new HttpError({
        message: error.errors,
        statusCode: BAD_REQUEST
      });
    }

    const { name } = request.body;
    
    const createTagService = new CreateTagService();

    const tag = await createTagService.execute(name);

    return response.json(tag);
  }
}

export { CreateTagController };
