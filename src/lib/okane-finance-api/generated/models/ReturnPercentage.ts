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
 * @interface ReturnPercentage
 */
export interface ReturnPercentage {
}

/**
 * Check if a given object implements the ReturnPercentage interface.
 */
export function instanceOfReturnPercentage(value: object): boolean {
    return true;
}

export function ReturnPercentageFromJSON(json: any): ReturnPercentage {
    return ReturnPercentageFromJSONTyped(json, false);
}

export function ReturnPercentageFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReturnPercentage {
    return json;
}

export function ReturnPercentageToJSON(value?: ReturnPercentage | null): any {
    return value;
}

