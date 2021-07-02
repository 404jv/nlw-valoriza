import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";
import { SendMailService } from "../services/SendMailService";
import * as yup from 'yup';
import { HttpError } from "../errors/HttpError";
import { BAD_REQUEST } from "../helpers/httpHelpers";

class CreateComplimentController {
  
  async handle(request: Request, response: Response) {
    const schema = yup.object().shape({
      tag_id: yup.string().required(),
      user_receiver: yup.string().required(),
      message: yup.string().required(),
    });
    
    try {
      schema.validateSync(request.body);
    } catch (error) {
      throw new HttpError({
        message: error.errors,
        statusCode: BAD_REQUEST
      });
    }
    
    const { tag_id, user_receiver, message } = request.body;
    const { user_id } = request;

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      tag_id,
      user_sender: user_id,
      user_receiver,
      message,
    });

    const sendMailService = new SendMailService();

    await sendMailService.execute({
      user_id,
      text: message,
      subject: 'You got a new compliment!.'
    });

    return response.json(compliment);
  }
}

export { CreateComplimentController };
