import { HttpError } from "../errors/HttpError";

export const UNPROCESSABLE_ENTITY = new HttpError({
  message: 'Incorrect name!',
  statusCode: 422
});
