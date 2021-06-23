import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { TagRepositories } from "../repositories/TagRepositories";

const UNPROCESSABLE_ENTITY = 422;
const CONFLICT = 409;

class CreateTagService {

  async execute(name: string) {
    const tagRepositories = getCustomRepository(TagRepositories);

    if (!name) {
      throw new AppError('Incorrect name!', UNPROCESSABLE_ENTITY);
    }

    const tagAlreayExists = await tagRepositories.findOne({
      name
    });
  
    if (tagAlreayExists) {
      throw new AppError('Tag already exists!', CONFLICT);
    }

    const tag = tagRepositories.create({ name });

    await tagRepositories.save(tag);

    return tag;
  }
}

export { CreateTagService };
