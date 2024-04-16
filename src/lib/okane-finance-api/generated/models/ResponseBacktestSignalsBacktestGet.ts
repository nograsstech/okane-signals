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
import type { BacktestResponseDTO } from './BacktestResponseDTO';
import {
    BacktestResponseDTOFromJSON,
    BacktestResponseDTOFromJSONTyped,
    BacktestResponseDTOToJSON,
} from './BacktestResponseDTO';
import type { BacktestStats } from './BacktestStats';
import {
    BacktestStatsFromJSON,
    BacktestStatsFromJSONTyped,
    BacktestStatsToJSON,
} from './BacktestStats';

/**
 * 
 * @export
 * @interface ResponseBacktestSignalsBacktestGet
 */
export interface ResponseBacktestSignalsBacktestGet {
    /**
     * 
     * @type {any}
     * @memberof ResponseBacktestSignalsBacktestGet
     */
    status: any | null;
    /**
     * 
     * @type {any}
     * @memberof ResponseBacktestSignalsBacktestGet
     */
    message: any | null;
    /**
     * 
     * @type {BacktestStats}
     * @memberof ResponseBacktestSignalsBacktestGet
     */
    data: BacktestStats;
}

/**
 * Check if a given object implements the ResponseBacktestSignalsBacktestGet interface.
 */
export function instanceOfResponseBacktestSignalsBacktestGet(value: object): boolean {
    if (!('status' in value)) return false;
    if (!('message' in value)) return false;
    if (!('data' in value)) return false;
    return true;
}

export function ResponseBacktestSignalsBacktestGetFromJSON(json: any): ResponseBacktestSignalsBacktestGet {
    return ResponseBacktestSignalsBacktestGetFromJSONTyped(json, false);
}

export function ResponseBacktestSignalsBacktestGetFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResponseBacktestSignalsBacktestGet {
    if (json == null) {
        return json;
    }
    return {
        
        'status': json['status'],
        'message': json['message'],
        'data': BacktestStatsFromJSON(json['data']),
    };
}

export function ResponseBacktestSignalsBacktestGetToJSON(value?: ResponseBacktestSignalsBacktestGet | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'status': value['status'],
        'message': value['message'],
        'data': BacktestStatsToJSON(value['data']),
    };
}
