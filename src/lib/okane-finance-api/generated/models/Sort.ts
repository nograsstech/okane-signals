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
 * @interface Sort
 */
export interface Sort {
}

/**
 * Check if a given object implements the Sort interface.
 */
export function instanceOfSort(value: object): boolean {
    return true;
}

export function SortFromJSON(json: any): Sort {
    return SortFromJSONTyped(json, false);
}

export function SortFromJSONTyped(json: any, ignoreDiscriminator: boolean): Sort {
    return json;
}

export function SortToJSON(value?: Sort | null): any {
    return value;
}

