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
 * @interface BestTrade
 */
export interface BestTrade {
}

/**
 * Check if a given object implements the BestTrade interface.
 */
export function instanceOfBestTrade(value: object): boolean {
    return true;
}

export function BestTradeFromJSON(json: any): BestTrade {
    return BestTradeFromJSONTyped(json, false);
}

export function BestTradeFromJSONTyped(json: any, ignoreDiscriminator: boolean): BestTrade {
    return json;
}

export function BestTradeToJSON(value?: BestTrade | null): any {
    return value;
}

