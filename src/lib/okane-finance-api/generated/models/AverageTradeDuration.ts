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
 * @interface AverageTradeDuration
 */
export interface AverageTradeDuration {
}

/**
 * Check if a given object implements the AverageTradeDuration interface.
 */
export function instanceOfAverageTradeDuration(value: object): boolean {
    return true;
}

export function AverageTradeDurationFromJSON(json: any): AverageTradeDuration {
    return AverageTradeDurationFromJSONTyped(json, false);
}

export function AverageTradeDurationFromJSONTyped(json: any, ignoreDiscriminator: boolean): AverageTradeDuration {
    return json;
}

export function AverageTradeDurationToJSON(value?: AverageTradeDuration | null): any {
    return value;
}
