import { getCustomRepository } from 'typeorm';
import { UserRepositories } from "../repositories/UserRepositories";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({ name, email, admin }: IUserRequest) {
    const userRepository = getCustomRepository(UserRepositories);

    if (!email) {
      throw new Error('Email incorrect')
    }

    const userAlreayExists = await userRepository.findOne({
      email,
    });

    if (userAlreayExists) {
      throw new Error('User alreay exists');
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
