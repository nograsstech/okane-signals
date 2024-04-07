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
 * @interface SignalResponseDTO
 */
export interface SignalResponseDTO {
    /**
     * 
     * @type {number}
     * @memberof SignalResponseDTO
     */
    status: number;
    /**
     * 
     * @type {string}
     * @memberof SignalResponseDTO
     */
    message: string;
}

/**
 * Check if a given object implements the SignalResponseDTO interface.
 */
export function instanceOfSignalResponseDTO(value: object): boolean {
    if (!('status' in value)) return false;
    if (!('message' in value)) return false;
    return true;
}

export function SignalResponseDTOFromJSON(json: any): SignalResponseDTO {
    return SignalResponseDTOFromJSONTyped(json, false);
}

export function SignalResponseDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): SignalResponseDTO {
    if (json == null) {
        return json;
    }
    return {
        
        'status': json['status'],
        'message': json['message'],
    };
}

export function SignalResponseDTOToJSON(value?: SignalResponseDTO | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'status': value['status'],
        'message': value['message'],
    };
}

