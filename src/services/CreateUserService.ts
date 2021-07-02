import { getCustomRepository } from 'typeorm';
import { HttpError } from '../errors/HttpError';
import { UserRepositories } from "../repositories/UserRepositories";
import { hash } from 'bcryptjs';
import { CONFLICT } from '../helpers/httpHelpers';

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUserService {
  async execute({ name, email, admin = false, password }: IUserRequest) {
    const userRepository = getCustomRepository(UserRepositories);

    const userAlreayExists = await userRepository.findOne({
      email,
    });

    if (userAlreayExists) {
      throw new HttpError({
        message: 'User alreay exists', 
        statusCode: CONFLICT
      });
    }

    const passwordHash = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    })

    await userRepository.save(user);

    return user;
  }
}

export { CreateUserService };
