import AppError from '@shared/errors/AppError';
import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import authConfig from '@config/auth';

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing.', 400);
  }

  // Bearer ahsdgaywdbawjdsajdjasjdjndsa
  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    return next();
  } catch {
    throw new AppError('Invalid JWT token.', 400);
  }
}
