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
 * @interface BuyAndHoldReturn
 */
export interface BuyAndHoldReturn {
}

/**
 * Check if a given object implements the BuyAndHoldReturn interface.
 */
export function instanceOfBuyAndHoldReturn(value: object): boolean {
    return true;
}

export function BuyAndHoldReturnFromJSON(json: any): BuyAndHoldReturn {
    return BuyAndHoldReturnFromJSONTyped(json, false);
}

export function BuyAndHoldReturnFromJSONTyped(json: any, ignoreDiscriminator: boolean): BuyAndHoldReturn {
    return json;
}

export function BuyAndHoldReturnToJSON(value?: BuyAndHoldReturn | null): any {
    return value;
}

