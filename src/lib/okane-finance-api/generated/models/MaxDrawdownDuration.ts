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
 * @interface MaxDrawdownDuration
 */
export interface MaxDrawdownDuration {
}

/**
 * Check if a given object implements the MaxDrawdownDuration interface.
 */
export function instanceOfMaxDrawdownDuration(value: object): boolean {
    return true;
}

export function MaxDrawdownDurationFromJSON(json: any): MaxDrawdownDuration {
    return MaxDrawdownDurationFromJSONTyped(json, false);
}

export function MaxDrawdownDurationFromJSONTyped(json: any, ignoreDiscriminator: boolean): MaxDrawdownDuration {
    return json;
}

export function MaxDrawdownDurationToJSON(value?: MaxDrawdownDuration | null): any {
    return value;
}
