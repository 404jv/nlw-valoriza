import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UserRepositories } from "../repositories/UserRepositories";


const UNPROCESSABLE_ENTITY = 422;
const NOT_FOUND = 404;

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
      throw new AppError('Error Users senders cannot sendo to themselves!', UNPROCESSABLE_ENTITY);
    }
    
    const userReceiverExists = await usersRepositositories.findOne(user_receiver);
    
    if (!userReceiverExists) {
      throw new AppError('User Receiver does not exists!', NOT_FOUND);
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
