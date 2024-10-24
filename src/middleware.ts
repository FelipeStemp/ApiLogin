import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from "./model/user";

export const verifyJwt = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.status(403).json({ error: "Token não fornecido" });
    return;
  }
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

  jwt.verify(token, process.env.JWT_SECRET as string, (error, decoded) => {
    if (error) {
      res.status(401).json({ error: "Token inválido" });
      return
    }
    (req as Request & { user: IUser }).user = decoded as IUser;
    next();
  });
};
