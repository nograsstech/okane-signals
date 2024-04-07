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
import type { BacktestStats } from './BacktestStats';
import {
    BacktestStatsFromJSON,
    BacktestStatsFromJSONTyped,
    BacktestStatsToJSON,
} from './BacktestStats';

/**
 * 
 * @export
 * @interface BacktestResponseDTO
 */
export interface BacktestResponseDTO {
    /**
     * 
     * @type {number}
     * @memberof BacktestResponseDTO
     */
    status: number;
    /**
     * 
     * @type {string}
     * @memberof BacktestResponseDTO
     */
    message: string;
    /**
     * 
     * @type {BacktestStats}
     * @memberof BacktestResponseDTO
     */
    data: BacktestStats;
}

/**
 * Check if a given object implements the BacktestResponseDTO interface.
 */
export function instanceOfBacktestResponseDTO(value: object): boolean {
    if (!('status' in value)) return false;
    if (!('message' in value)) return false;
    if (!('data' in value)) return false;
    return true;
}

export function BacktestResponseDTOFromJSON(json: any): BacktestResponseDTO {
    return BacktestResponseDTOFromJSONTyped(json, false);
}

export function BacktestResponseDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): BacktestResponseDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'status': json['status'],
        'message': json['message'],
        'data': BacktestStatsFromJSON(json['data']),
    };
}

export function BacktestResponseDTOToJSON(value?: BacktestResponseDTO | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'status': value['status'],
        'message': value['message'],
        'data': BacktestStatsToJSON(value['data']),
    };
}

