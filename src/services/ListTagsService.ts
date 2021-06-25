import { getCustomRepository } from "typeorm";
import { TagRepositories } from "../repositories/TagRepositories";
import { classToPlain } from 'class-transformer';

class ListTagsService {

  async execute() {
    const tagsRepositores = getCustomRepository(TagRepositories);

    const tags = await tagsRepositores.find();

    return classToPlain(tags);
  }
}

export { ListTagsService };
