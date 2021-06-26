import { getCustomRepository } from "typeorm";
import { HttpError } from "../errors/HttpError";
import { TagRepositories } from "../repositories/TagRepositories";

const UNPROCESSABLE_ENTITY = 422;
const CONFLICT = 409;

class CreateTagService {

  async execute(name: string) {
    const tagRepositories = getCustomRepository(TagRepositories);

    if (!name) {
      throw new HttpError({
        message: 'Incorrect name!',
        statusCode: UNPROCESSABLE_ENTITY
      });
    }

    const tagAlreayExists = await tagRepositories.findOne({
      name
    });
  
    if (tagAlreayExists) {
      throw new HttpError({
        message: 'Tag already exists!',
        statusCode: CONFLICT
      });
    }

    const tag = tagRepositories.create({ name });

    await tagRepositories.save(tag);

    return tag;
  }
}

export { CreateTagService };
