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
 * @interface AvgTrade
 */
export interface AvgTrade {
}

/**
 * Check if a given object implements the AvgTrade interface.
 */
export function instanceOfAvgTrade(value: object): boolean {
    return true;
}

export function AvgTradeFromJSON(json: any): AvgTrade {
    return AvgTradeFromJSONTyped(json, false);
}

export function AvgTradeFromJSONTyped(json: any, ignoreDiscriminator: boolean): AvgTrade {
    return json;
}

export function AvgTradeToJSON(value?: AvgTrade | null): any {
    return value;
}

