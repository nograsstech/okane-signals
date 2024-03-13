import CandleStickIcon from "lucide-svelte/icons/candlestick-chart";
import StrategyIcon from "lucide-svelte/icons/list-checks";

export const OkaneNodeOptions = [
  {
    nodeType: 'ticker-node',
    label: 'Ticker Node',
    icon: CandleStickIcon
  },
  {
    nodeType: 'strategy-node',
    label: 'Strategy Node',
    icon: StrategyIcon
  }
]