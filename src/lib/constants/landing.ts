import Pencil from 'lucide-svelte/icons/pencil';
import FlaskConical from 'lucide-svelte/icons/flask-conical';
import Save from 'lucide-svelte/icons/save';
import BellRing from 'lucide-svelte/icons/bell-ring';

export const KEY_FEATURES = [
	{
		title: 'Customizable Parameters',
		description:
			'Modify technical indicators, risk management settings, and market conditions to align with your trading goals.',
		icon: Pencil
	},
	{
		title: 'Backtesting',
		description:
			'Rigorously test your strategies against historical market data to evaluate their performance and refine them before execution.',
		icon: FlaskConical
	},
	{
		title: 'Strategy Saving',
		description:
			'Save your custom strategies securely, allowing you to access and deploy them whenever you need.',
		icon: Save
	},
	{
		title: 'Push Notifications',
		description: `Receive real-time alerts directly to your device when market conditions meet your strategy's criteria, enabling you to take timely trades.`,
		icon: BellRing
	}
];
