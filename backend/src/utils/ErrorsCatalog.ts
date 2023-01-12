import StatusHttp from './StatusHttp';

type ErrorObject = { 
  statusHttp: number
  message: string;
};

export enum ErrorsTypes {
  INVALID_ID = 'INVALID_ID',
  NOT_FOUND_CLIENT = 'NOT_FOUND_CLIENT',
}

export type ErrorsCatalog = {
  [key in ErrorsTypes]: ErrorObject
};

export const errorCatalog: ErrorsCatalog = {
  INVALID_ID: {
    statusHttp: StatusHttp.BAD_REQUEST,
    message: 'Invalid id',
  },
  NOT_FOUND_CLIENT: {
    statusHttp: StatusHttp.NOT_FOUND,
    message: 'Client not found',
  }
};
