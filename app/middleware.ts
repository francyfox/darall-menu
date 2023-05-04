import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";
import { CONFIG } from "./env.config";

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: CONFIG.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}

export function isAuthenticated(req: Request & { payload: string | JwtPayload }, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);
    throw new Error('🚫 Un-Authorized 🚫');
  }

  try {
    const token = authorization.split(' ')[1];
    req.payload = jwt.verify(token, CONFIG.JWT_ACCESS_SECRET);
  } catch (err: any) {
    res.status(401);
    if (err.name === 'TokenExpiredError') {
      throw new Error(err.name);
    }
    throw new Error('🚫 Un-Authorized 🚫');
  }

  return next();
}