import { getCustomRepository } from "typeorm";
import { HttpError } from "../errors/HttpError";
import { CONFLICT, UNPROCESSABLE_ENTITY } from "../helpers/httpHelpers";
import { TagRepositories } from "../repositories/TagRepositories";

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
