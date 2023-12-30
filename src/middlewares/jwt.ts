import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

var jwtSecret: any = process.env.JWT_SECRET;

export const generateJwt = (
  id: any,
  email: any,
  next: NextFunction,
  isRecruiter: boolean
) => {
  try {
    let token = jwt.sign({ id, email, isRecruiter }, jwtSecret, {
      expiresIn: '168h',
    });
    return token;
  } catch (err) {
    console.log(err);
    const error = new Error('Error! Something went wrong.');
    return next(error);
  }
};

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.status(404).json({
        success: false,
        message: 'Error! Token was not provided.',
      });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, jwtSecret);
    req['user'] = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized, check JWT',
    });
  }
};
