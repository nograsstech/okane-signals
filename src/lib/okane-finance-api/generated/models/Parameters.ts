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
 * @interface Parameters
 */
export interface Parameters {
}

/**
 * Check if a given object implements the Parameters interface.
 */
export function instanceOfParameters(value: object): boolean {
    return true;
}

export function ParametersFromJSON(json: any): Parameters {
    return ParametersFromJSONTyped(json, false);
}

export function ParametersFromJSONTyped(json: any, ignoreDiscriminator: boolean): Parameters {
    return json;
}

export function ParametersToJSON(value?: Parameters | null): any {
    return value;
}

