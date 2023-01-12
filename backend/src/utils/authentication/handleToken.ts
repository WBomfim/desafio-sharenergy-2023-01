import 'dotenv/config';
import { sign, verify } from 'jsonwebtoken';
import { IUser } from '../../interfaces/IUser'
import { ErrorsTypes } from '../errors/ErrorsCatalog';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateToken = (user: IUser): string => {
  const { _id, username } = user;

  const payload = {
    _id,
    username
  }

  const config = {
    expiresIn: '1d'
  }

  return sign(payload, JWT_SECRET, config);
}

export const verifyToken = (token: string): IUser => {
  try {
    const payload = verify(token, JWT_SECRET) as IUser;
    return payload;
  } catch (error) {
    throw new Error(ErrorsTypes.INVALID_TOKEN);
  }
}
