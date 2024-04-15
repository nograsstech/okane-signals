import {
	OKANE_FINANCE_API_URL,
	OKANE_FINANCE_API_USER,
	OKANE_FINANCE_API_PASSWORD
} from '$env/static/private';
import { Configuration, SignalsApi } from './generated';

const config = new Configuration({
  basePath: OKANE_FINANCE_API_URL,
  username: OKANE_FINANCE_API_USER,
  password: OKANE_FINANCE_API_PASSWORD
})
export const okaneClient = new SignalsApi(config);