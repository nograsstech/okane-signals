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
 * @interface PeakEquity
 */
export interface PeakEquity {
}

/**
 * Check if a given object implements the PeakEquity interface.
 */
export function instanceOfPeakEquity(value: object): boolean {
    return true;
}

export function PeakEquityFromJSON(json: any): PeakEquity {
    return PeakEquityFromJSONTyped(json, false);
}

export function PeakEquityFromJSONTyped(json: any, ignoreDiscriminator: boolean): PeakEquity {
    return json;
}

export function PeakEquityToJSON(value?: PeakEquity | null): any {
    return value;
}
