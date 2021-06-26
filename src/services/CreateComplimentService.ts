import { getCustomRepository } from "typeorm";
import { HttpError } from "../errors/HttpError";
import { NOT_FOUND, UNPROCESSABLE_ENTITY } from "../helpers/httpHelpers";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UserRepositories } from "../repositories/UserRepositories";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {

  async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
    const usersRepositositories = getCustomRepository(UserRepositories);

    if (user_sender === user_receiver) {
      throw new HttpError({
        message: 'Error Users senders cannot sendo to themselves!',
        statusCode: UNPROCESSABLE_ENTITY
      });
    }
    
    const userReceiverExists = await usersRepositositories.findOne(user_receiver);
    
    if (!userReceiverExists) {
      throw new HttpError({
        message: 'User Receiver does not exists!', 
        statusCode: NOT_FOUND
      });
    }
    
    
    const compliment = complimentsRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message
    });
    
    await complimentsRepositories.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };
