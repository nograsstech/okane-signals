import { error, json } from '@sveltejs/kit';
import { okaneClient } from '@/okane-finance-api/oakne-client.js';

export async function GET({ url, setHeaders }) {
  const ticker = url.searchParams.get('ticker') ?? '';
	const period = url.searchParams.get('period') ?? '';
	const interval = url.searchParams.get('interval') ?? '';
	const strategy = url.searchParams.get('strategy') ?? '';

  if (!ticker || !period || !interval || !strategy) {
    return error(400, 'Bad Request');
  }

  try {
    const signals = await okaneClient.getSignalsSignalsGet({
      ticker,
      interval,
      period,
      strategy,
    });
  
    setHeaders({ 'cache-control': 'max-age=300' });
  
    return json({
      signals
    })
  } catch (err) {
    return error(500, 'Internal Server Error: ' + err);
  }
}