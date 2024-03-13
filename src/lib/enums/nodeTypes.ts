export enum OkaneNodeType {
	INTERACTIVE_NODE = 'interactive-node',
	TICKER_NODE = 'ticker-node',
	STRATEGY_NODE = 'strategy-node'
}

export type OkaneNodeTypes = keyof typeof OkaneNodeType;