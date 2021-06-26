import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { HttpError } from "../errors/HttpError";
import { UNAUTHORIZED } from "../helpers/httpHelpers";
import { UserRepositories } from "../repositories/UserRepositories";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const { user_id } = request;

  const usersRepositories = getCustomRepository(UserRepositories);

  const { admin } = await usersRepositories.findOne(user_id);

  if (admin) {
    return next();
  }
  
  throw new HttpError({
    message: '', 
    statusCode: UNAUTHORIZED
  });
}
