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
 * @interface TickerResponseDTO
 */
export interface TickerResponseDTO {
    /**
     * 
     * @type {number}
     * @memberof TickerResponseDTO
     */
    status: number;
    /**
     * 
     * @type {string}
     * @memberof TickerResponseDTO
     */
    message: string;
}

/**
 * Check if a given object implements the TickerResponseDTO interface.
 */
export function instanceOfTickerResponseDTO(value: object): boolean {
    if (!('status' in value)) return false;
    if (!('message' in value)) return false;
    return true;
}

export function TickerResponseDTOFromJSON(json: any): TickerResponseDTO {
    return TickerResponseDTOFromJSONTyped(json, false);
}

export function TickerResponseDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): TickerResponseDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'status': json['status'],
        'message': json['message'],
    };
}

export function TickerResponseDTOToJSON(value?: TickerResponseDTO | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'status': value['status'],
        'message': value['message'],
    };
}

