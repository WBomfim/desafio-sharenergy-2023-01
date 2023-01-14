import StatusHttp from '../StatusHttp';

type ErrorObject = { 
  statusHttp: number
  message: string;
};

export enum ErrorsTypes {
  INVALID_ID = 'INVALID_ID',
  INVALID_TOKEN = 'INVALID_TOKEN',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  NOT_FOUND_CLIENT = 'NOT_FOUND_CLIENT',
  NOT_FOUND_USER = 'NOT_FOUND_USER',
  NOT_FOUND_TOKEN = 'NOT_FOUND_TOKEN',
  INTEGRATION_ERROR = 'INTEGRATION_ERROR',
}

export type ErrorsCatalog = {
  [key in ErrorsTypes]: ErrorObject
};

export const errorCatalog: ErrorsCatalog = {
  INVALID_ID: {
    statusHttp: StatusHttp.BAD_REQUEST,
    message: 'Invalid id',
  },
  INVALID_TOKEN: {
    statusHttp: StatusHttp.UNAUTHORIZED,
    message: 'Invalid token',
  },
  INVALID_PASSWORD: {
    statusHttp: StatusHttp.UNAUTHORIZED,
    message: 'Invalid password',
  },
  NOT_FOUND_CLIENT: {
    statusHttp: StatusHttp.NOT_FOUND,
    message: 'Client not found',
  },
  NOT_FOUND_USER: {
    statusHttp: StatusHttp.NOT_FOUND,
    message: 'User not found',
  },
  NOT_FOUND_TOKEN: {
    statusHttp: StatusHttp.UNAUTHORIZED,
    message: 'Token not found',
  },
  INTEGRATION_ERROR: {
    statusHttp: StatusHttp.NOT_FOUND,
    message: 'Connection error with external engine',
  }
};
