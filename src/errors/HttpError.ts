interface IHttpError {
  message: string;
  statusCode: number;
}

class HttpError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor({ message, statusCode = 400 }: IHttpError) {
    this.message =  message;
    this.statusCode = statusCode;
  }
}

export { HttpError };
