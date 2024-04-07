import {
	VITE_OKANE_FINANCE_API_URL,
	VITE_OKANE_FINANCE_API_USER,
	VITE_OKANE_FINANCE_API_PASSWORD
} from '$env/static/private';
import { Configuration, SignalsApi } from './generated';

const config = new Configuration({
  basePath: VITE_OKANE_FINANCE_API_URL,
  username: VITE_OKANE_FINANCE_API_USER,
  password: VITE_OKANE_FINANCE_API_PASSWORD
})
export const okaneClient = new SignalsApi(config);