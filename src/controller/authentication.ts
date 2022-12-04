import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../model/user';

export function authenticate(
  req: express.Request,
  res: express.Response,
  next: Function
): void {
  try {
    const decodedToken = jwt.verify(
      String(req.headers.authorization),
      String(process.env.TOKEN_SECRET)
    ) as JwtPayload;

    req.body.userId = decodedToken['user']['id'];

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json('Access denied, invalid token');
  }
}

export function generateToken(user: Omit<User, 'password'>): String {
  const token = jwt.sign(
    {
      user: {
        id: user.id,
        username: `${user.firstName} ${user.lastName}`,
      },
    },
    String(process.env.TOKEN_SECRET),
    { noTimestamp: true }
  );

  return token;
}
