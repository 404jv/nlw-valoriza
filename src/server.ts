import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import './database';
import { router } from "./routes";
import { AppError } from "./errors/AppError";

const app = express();

app.use(express.json());
app.use(router);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      error:  error.message
    })
  }

  console.log(error);

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
});

app.listen(3000, () => console.log('🚀 Server is running at http://localhost:3000'));
