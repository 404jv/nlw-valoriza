import express, { Request, Response } from 'express';

const app = express();

app.get('/test', (request: Request, response: Response) => {
  return response.send('Olá, NLW!');
});

app.listen(3000, () => console.log('🚀 Server is running at http://localhost:3000'));
