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


import * as runtime from '../runtime';
import type {
  HTTPValidationError,
  TickerResponseDTO,
} from '../models/index';
import {
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    TickerResponseDTOFromJSON,
    TickerResponseDTOToJSON,
} from '../models/index';

export interface AchieveTickerInfoTickersInfoGetRequest {
    ticker: string;
}

export interface ArchieveTickerPriceHistoryTickersHistoryGetRequest {
    ticker: string;
}

/**
 * 
 */
export class TickersApi extends runtime.BaseAPI {

    /**
     * Achieve Ticker Info
     */
    async achieveTickerInfoTickersInfoGetRaw(requestParameters: AchieveTickerInfoTickersInfoGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TickerResponseDTO>> {
        if (requestParameters['ticker'] == null) {
            throw new runtime.RequiredError(
                'ticker',
                'Required parameter "ticker" was null or undefined when calling achieveTickerInfoTickersInfoGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['ticker'] != null) {
            queryParameters['ticker'] = requestParameters['ticker'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/tickers/info`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TickerResponseDTOFromJSON(jsonValue));
    }

    /**
     * Achieve Ticker Info
     */
    async achieveTickerInfoTickersInfoGet(requestParameters: AchieveTickerInfoTickersInfoGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TickerResponseDTO> {
        const response = await this.achieveTickerInfoTickersInfoGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Archieve Ticker Price History
     */
    async archieveTickerPriceHistoryTickersHistoryGetRaw(requestParameters: ArchieveTickerPriceHistoryTickersHistoryGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<TickerResponseDTO>> {
        if (requestParameters['ticker'] == null) {
            throw new runtime.RequiredError(
                'ticker',
                'Required parameter "ticker" was null or undefined when calling archieveTickerPriceHistoryTickersHistoryGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['ticker'] != null) {
            queryParameters['ticker'] = requestParameters['ticker'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/tickers/history`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TickerResponseDTOFromJSON(jsonValue));
    }

    /**
     * Archieve Ticker Price History
     */
    async archieveTickerPriceHistoryTickersHistoryGet(requestParameters: ArchieveTickerPriceHistoryTickersHistoryGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<TickerResponseDTO> {
        const response = await this.archieveTickerPriceHistoryTickersHistoryGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
