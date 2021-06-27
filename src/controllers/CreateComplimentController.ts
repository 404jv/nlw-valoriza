import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";
import { CreateComplimentService } from "../services/CreateComplimentService";
import { SendMailService } from "../services/SendMailService";


class CreateComplimentController {
  
  async handle(request: Request, response: Response) {
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
