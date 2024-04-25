import { db } from '@/drizzle/db';
import { tradeActions } from '@/drizzle/schemas/tradeActions';
import { error, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function GET({ url, setHeaders }) {
	const backtest_id = url.searchParams.get('backtest_id') ?? '';

	try {
		const tradeActionsList = await db
			.select()
			.from(tradeActions)
			.where(eq(tradeActions.backtest_id, backtest_id))
			.execute();

		setHeaders({ 'cache-control': 'max-age=300' });

		return json({
			tradeActionsList
		});
	} catch (err) {
		return error(500, 'Internal Server Error: ' + err);
	}
}
