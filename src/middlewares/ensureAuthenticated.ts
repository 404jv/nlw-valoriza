import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";

interface IPayLoad {
  sub: string;
}

const UNAUTHORIZED = 401;

export function ensureAuthenticated(
  request: Request, 
  response: Response, 
  next: NextFunction
) {

  const bearerToken = request.headers.authorization

  if (!bearerToken) {
    throw new AppError('', UNAUTHORIZED);
  }

  const [, token] = bearerToken.split(' ');

  try {
    const { sub } = verify(token, 'cbd18b3884c75b1fb5bb00ea2a9fa2ba') as IPayLoad;

    request.user_id = sub;

    return next();
  } catch (error) {
    throw new AppError('', UNAUTHORIZED);
  }
}
