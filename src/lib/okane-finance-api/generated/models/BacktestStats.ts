/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface BacktestStats
 */
export interface BacktestStats {
    /**
     * 
     * @type {any}
     * @memberof BacktestStats
     */
    notificationsOn: boolean | null;
    /**
     * 
     * @type {any}
     * @memberof BacktestStats
     */
    ticker: any | null;
    /**
     * 
     * @type {number}
     * @memberof BacktestStats
     */
    maxDrawdownPercentage: number;
    /**
     * 
     * @type {any}
     * @memberof BacktestStats
     */
    startTime: any | null;
    /**
     * 
     * @type {any}
     * @memberof BacktestStats
     */
    endTime: any | null;
    /**
     * 
     * @type {any}
     * @memberof BacktestStats
     */
    duration: any | null;
    /**
     * 
     * @type {number}
     * @memberof BacktestStats
     */
    exposureTimePercentage: number;
    /**
     * 
     * @type {number}
     * @memberof BacktestStats
     */
    finalEquity: number;
    /**
     * 
     * @type {number}
     * @memberof BacktestStats
     */
    peakEquity: number;
    /**
     * 
     * @type {number}
     * @memberof BacktestStats
     */
    returnPercentage: number;
    /**
     * 
     * @type {number}
     * @memberof BacktestStats
     */
    buyAndHoldReturn: number;
    /**
     * 
     * @type {number}
     * @memberof BacktestStats
     */
    returnAnnualized: number;
    /**
     * 
     * @type {number}
     * @memberof BacktestStats
     */
    volatilityAnnualized: number;
    /**
     * 
     * @type {number}
     * @memberof BacktestStats
     */
    sharpeRatio: number;
    /**
     * 
     * @type {number}
     * @memberof BacktestStats
     */
    sortinoRatio: number;
    /**
     * 
     * @type {number}
     * @memberof BacktestStats
     */
    calmarRatio: number;
    /**
     * 
     * @type {number}
     * @memberof BacktestStats
     */
    averageDrawdownPercentage: number;
    /**
     * 
     * @type {any}
     * @memberof BacktestStats
     */
    maxDrawdownDuration: any | null;
    /**
     * 
     * @type {any}
     * @memberof BacktestStats
     */
    averageDrawdownDuration: any | null;
    /**
     * 
     * @type {number}
     * @memberof BacktestStats
     */
    tradeCount: number;
    /**
     * 
     * @type {number}
     * @memberof BacktestStats
     */
    winRate: number;
    /**
     * 
     * @type {number}
     * @memberof BacktestStats
     */
    bestTrade: number;
    /**
     * 
     * @type {number}
     * @memberof BacktestStats
     */
    worstTrade: number;
    /**
     * 
     * @type {number}
     * @memberof BacktestStats
     */
    avgTrade: number;
    /**
     * 
     * @type {any}
     * @memberof BacktestStats
     */
    maxTradeDuration: any | null;
    /**
     * 
     * @type {any}
     * @memberof BacktestStats
     */
    averageTradeDuration: any | null;
    /**
     * 
     * @type {number}
     * @memberof BacktestStats
     */
    profitFactor: number;
    /**
     * 
     * @type {any}
     * @memberof BacktestStats
     */
    html: any | null;
    /**
     * 
     * @type {number}
     * @memberof BacktestStats
     */
    tpslRatio: number;
    /**
     * 
     * @type {number}
     * @memberof BacktestStats
     */
    slCoef: number;
}

/**
 * Check if a given object implements the BacktestStats interface.
 */
export function instanceOfBacktestStats(value: object): boolean {
    if (!('ticker' in value)) return false;
    if (!('maxDrawdownPercentage' in value)) return false;
    if (!('startTime' in value)) return false;
    if (!('endTime' in value)) return false;
    if (!('duration' in value)) return false;
    if (!('exposureTimePercentage' in value)) return false;
    if (!('finalEquity' in value)) return false;
    if (!('peakEquity' in value)) return false;
    if (!('returnPercentage' in value)) return false;
    if (!('buyAndHoldReturn' in value)) return false;
    if (!('returnAnnualized' in value)) return false;
    if (!('volatilityAnnualized' in value)) return false;
    if (!('sharpeRatio' in value)) return false;
    if (!('sortinoRatio' in value)) return false;
    if (!('calmarRatio' in value)) return false;
    if (!('averageDrawdownPercentage' in value)) return false;
    if (!('maxDrawdownDuration' in value)) return false;
    if (!('averageDrawdownDuration' in value)) return false;
    if (!('tradeCount' in value)) return false;
    if (!('winRate' in value)) return false;
    if (!('bestTrade' in value)) return false;
    if (!('worstTrade' in value)) return false;
    if (!('avgTrade' in value)) return false;
    if (!('maxTradeDuration' in value)) return false;
    if (!('averageTradeDuration' in value)) return false;
    if (!('profitFactor' in value)) return false;
    if (!('html' in value)) return false;
    if (!('tpslRatio' in value)) return false;
    if (!('slCoef' in value)) return false;
    return true;
}

export function BacktestStatsFromJSON(json: any): BacktestStats {
    return BacktestStatsFromJSONTyped(json, false);
}

export function BacktestStatsFromJSONTyped(json: any, ignoreDiscriminator: boolean): BacktestStats {
    if (json == null) {
        return json;
    }
    return {
        
        'ticker': json['ticker'],
        'maxDrawdownPercentage': json['max_drawdown_percentage'],
        'startTime': json['start_time'],
        'endTime': json['end_time'],
        'duration': json['duration'],
        'exposureTimePercentage': json['exposure_time_percentage'],
        'finalEquity': json['final_equity'],
        'peakEquity': json['peak_equity'],
        'returnPercentage': json['return_percentage'],
        'buyAndHoldReturn': json['buy_and_hold_return'],
        'returnAnnualized': json['return_annualized'],
        'volatilityAnnualized': json['volatility_annualized'],
        'sharpeRatio': json['sharpe_ratio'],
        'sortinoRatio': json['sortino_ratio'],
        'calmarRatio': json['calmar_ratio'],
        'averageDrawdownPercentage': json['average_drawdown_percentage'],
        'maxDrawdownDuration': json['max_drawdown_duration'],
        'averageDrawdownDuration': json['average_drawdown_duration'],
        'tradeCount': json['trade_count'],
        'winRate': json['win_rate'],
        'bestTrade': json['best_trade'],
        'worstTrade': json['worst_trade'],
        'avgTrade': json['avg_trade'],
        'maxTradeDuration': json['max_trade_duration'],
        'averageTradeDuration': json['average_trade_duration'],
        'profitFactor': json['profit_factor'],
        'html': json['html'],
        'tpslRatio': json['tpslRatio'],
        'slCoef': json['sl_coef'],
    };
}

export function BacktestStatsToJSON(value?: BacktestStats | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'ticker': value['ticker'],
        'max_drawdown_percentage': value['maxDrawdownPercentage'],
        'start_time': value['startTime'],
        'end_time': value['endTime'],
        'duration': value['duration'],
        'exposure_time_percentage': value['exposureTimePercentage'],
        'final_equity': value['finalEquity'],
        'peak_equity': value['peakEquity'],
        'return_percentage': value['returnPercentage'],
        'buy_and_hold_return': value['buyAndHoldReturn'],
        'return_annualized': value['returnAnnualized'],
        'volatility_annualized': value['volatilityAnnualized'],
        'sharpe_ratio': value['sharpeRatio'],
        'sortino_ratio': value['sortinoRatio'],
        'calmar_ratio': value['calmarRatio'],
        'average_drawdown_percentage': value['averageDrawdownPercentage'],
        'max_drawdown_duration': value['maxDrawdownDuration'],
        'average_drawdown_duration': value['averageDrawdownDuration'],
        'trade_count': value['tradeCount'],
        'win_rate': value['winRate'],
        'best_trade': value['bestTrade'],
        'worst_trade': value['worstTrade'],
        'avg_trade': value['avgTrade'],
        'max_trade_duration': value['maxTradeDuration'],
        'average_trade_duration': value['averageTradeDuration'],
        'profit_factor': value['profitFactor'],
        'html': value['html'],
        'tpslRatio': value['tpslRatio'],
        'sl_coef': value['slCoef'],
    };
}

