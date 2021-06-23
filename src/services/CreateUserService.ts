import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { UserRepositories } from "../repositories/UserRepositories";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
}

const UNPROCESSABLE_ENTITY = 422;
const CONFLICT = 409;

class CreateUserService {
  async execute({ name, email, admin }: IUserRequest) {
    const userRepository = getCustomRepository(UserRepositories);

    if (!email) {
      throw new AppError('Email incorrect', UNPROCESSABLE_ENTITY);
    }

    const userAlreayExists = await userRepository.findOne({
      email,
    });

    if (userAlreayExists) {
      throw new AppError('User alreay exists', CONFLICT);
    }

    const user = userRepository.create({
      name,
      email,
      admin
    })

    await userRepository.save(user);

    return user;
  }
}

export { CreateUserService };
