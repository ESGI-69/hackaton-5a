import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import userService, { JwtPayload } from './service/user';

// Add the user property to the Request interface
declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: number;
      username: string;
      name: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
  }
}

/**
 * User population middleware. This middleware will populate the user in the request object from the JWT token.
 */
const populateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(process.env);
  if (!process.env.JWT_SECRET) return next(new Error('JWT_SECRET not set'));
  if (
    req.headers.authorization &&
    req.headers.authorization?.split(' ').length === 2 &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    const token = req.headers.authorization?.split(' ')[1];
    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
      req.user = await userService.findById(id);
      if (!req.user) return res.sendStatus(401);
      next();
    } catch (err) {
      return res.sendStatus(401);
    }
  } else {
    next();
  }
};

const isLogged = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user)
    return res.status(401).send({
      code: 'not_logged_in',
      message: 'Not logged in',
    });
  next();
};

export { isLogged, populateUser };
