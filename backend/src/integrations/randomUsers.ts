import axios from 'axios';
import { ErrorsTypes } from '../utils/errors/ErrorsCatalog';

export type UserResponse = {
	"results": [
		{
			"name": {
				"title": string,
				"first": string,
				"last": string
			},
			"email": string,
			"login": {
				"uuid": string,
				"username": string,
				"password": string,
				"salt": string,
				"md5": string,
				"sha1": string,
				"sha256": string
			},
			"dob": {
				"date": string,
				"age": 55
			},
			"picture": {
				"large": string,
				"medium": string,
				"thumbnail": string
			}
		}
	]
}

const api = axios.create({
  baseURL: 'https://randomuser.me/api/',
});

export const getUsers = async (): Promise<UserResponse> => {
  try {
    const { data } = await api.get('/?seed=abc&results=100&inc=picture,name,email,login,dob&noinfo');
  return data;
  } catch (error) {
    throw new Error(ErrorsTypes.INTEGRATION_ERROR);
  }
}
