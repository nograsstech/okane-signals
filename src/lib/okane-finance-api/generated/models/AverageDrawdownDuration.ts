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
 * @interface AverageDrawdownDuration
 */
export interface AverageDrawdownDuration {
}

/**
 * Check if a given object implements the AverageDrawdownDuration interface.
 */
export function instanceOfAverageDrawdownDuration(value: object): boolean {
    return true;
}

export function AverageDrawdownDurationFromJSON(json: any): AverageDrawdownDuration {
    return AverageDrawdownDurationFromJSONTyped(json, false);
}

export function AverageDrawdownDurationFromJSONTyped(json: any, ignoreDiscriminator: boolean): AverageDrawdownDuration {
    return json;
}

export function AverageDrawdownDurationToJSON(value?: AverageDrawdownDuration | null): any {
    return value;
}

