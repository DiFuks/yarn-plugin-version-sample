import { Request, Response, NextFunction } from 'express';

export const logger = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  console.log('New request:', {
    method: request.method,
    url: request.url,
    query: request.query,
  });

  next();
};
