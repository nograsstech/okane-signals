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
 * @interface Ticker
 */
export interface Ticker {
}

/**
 * Check if a given object implements the Ticker interface.
 */
export function instanceOfTicker(value: object): boolean {
    return true;
}

export function TickerFromJSON(json: any): Ticker {
    return TickerFromJSONTyped(json, false);
}

export function TickerFromJSONTyped(json: any, ignoreDiscriminator: boolean): Ticker {
    return json;
}

export function TickerToJSON(value?: Ticker | null): any {
    return value;
}

