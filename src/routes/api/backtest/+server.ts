import { error } from '@sveltejs/kit';
import {
	VITE_OKANE_FINANCE_API_URL,
	VITE_OKANE_FINANCE_API_USER,
	VITE_OKANE_FINANCE_API_PASSWORD
} from '$env/static/private';

/** @type {import('./$types').RequestHandler} */
/**
 * Performs a GET request to retrieve backtest data based on the provided parameters.
 * @param {Object} options - The options object containing the URL and other parameters.
 * @param {URL} options.url - The URL object containing the query parameters.
 * @returns {Promise<Response>} A promise that resolves to the backtest data response.
 */
export async function GET({ url }) {
	const ticker = url.searchParams.get('ticker') ?? '';
	const period = url.searchParams.get('period') ?? '';
	const interval = url.searchParams.get('interval') ?? '';
	const strategy = url.searchParams.get('strategy') ?? '';

	if (!ticker || !period || !interval || !strategy) {
		error(400, 'Bad Request');
	}

	const okaneBaseURL = `${VITE_OKANE_FINANCE_API_URL}`;
	const okaneUser = `${VITE_OKANE_FINANCE_API_USER}`;
	const okanePassword = `${VITE_OKANE_FINANCE_API_PASSWORD}`;

	const fetchURL =
		`${okaneBaseURL}/signals/backtest?` +
		new URLSearchParams({
			ticker,
			period,
			interval,
			strategy
		});
	console.log(fetchURL)
	const backtest = await fetch(fetchURL, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Basic ' + btoa(`${okaneUser}:${okanePassword}`)
		}
	});
	const backtest_data = await backtest.json();

	if (!backtest_data) {
		error(400, 'Bad Request');
	}

	return new Response(JSON.stringify(backtest_data));
}
