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
 * @interface MaxTradeDuration
 */
export interface MaxTradeDuration {
}

/**
 * Check if a given object implements the MaxTradeDuration interface.
 */
export function instanceOfMaxTradeDuration(value: object): boolean {
    return true;
}

export function MaxTradeDurationFromJSON(json: any): MaxTradeDuration {
    return MaxTradeDurationFromJSONTyped(json, false);
}

export function MaxTradeDurationFromJSONTyped(json: any, ignoreDiscriminator: boolean): MaxTradeDuration {
    return json;
}

export function MaxTradeDurationToJSON(value?: MaxTradeDuration | null): any {
    return value;
}
