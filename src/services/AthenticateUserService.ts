import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { HttpError } from "../errors/HttpError";
import { UNAUTHORIZED } from "../helpers/httpHelpers";
import { UserRepositories } from "../repositories/UserRepositories";

interface IAthenticateUserService {
  email: string;
  password: string;
}

class AthenticateUserService {
  
  async execute({ email, password }: IAthenticateUserService) {
    const userRepository = getCustomRepository(UserRepositories);

    const user = await userRepository.findOne({
      email
    });
    
    const passwordMatch = await compare(password, user.password);

    if (!user || !passwordMatch) {
      throw new HttpError({
        message: 'Email/password incorrect!',
        statusCode: UNAUTHORIZED
      });
    }

    const token = sign({
      email: user.email
    }, 'cbd18b3884c75b1fb5bb00ea2a9fa2ba', {
      subject: user.id,
      expiresIn: '1d'
    });

    return token;
  }
}

export { AthenticateUserService };
