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
 * @interface Period
 */
export interface Period {
}

/**
 * Check if a given object implements the Period interface.
 */
export function instanceOfPeriod(value: object): boolean {
    return true;
}

export function PeriodFromJSON(json: any): Period {
    return PeriodFromJSONTyped(json, false);
}

export function PeriodFromJSONTyped(json: any, ignoreDiscriminator: boolean): Period {
    return json;
}

export function PeriodToJSON(value?: Period | null): any {
    return value;
}

