import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  err: unknown,
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  console.log('Error:', err);

  response.status(500).send('Something broke!');

  next();
};
