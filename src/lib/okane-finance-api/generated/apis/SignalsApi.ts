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
  BacktestResponseDTO,
  End,
  HTTPValidationError,
  Parameters,
  Period,
  SignalResponseDTO,
  Start,
  Strategy,
} from '../models/index';
import {
    BacktestResponseDTOFromJSON,
    BacktestResponseDTOToJSON,
    EndFromJSON,
    EndToJSON,
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    ParametersFromJSON,
    ParametersToJSON,
    PeriodFromJSON,
    PeriodToJSON,
    SignalResponseDTOFromJSON,
    SignalResponseDTOToJSON,
    StartFromJSON,
    StartToJSON,
    StrategyFromJSON,
    StrategyToJSON,
} from '../models/index';

export interface BacktestSignalsBacktestGetRequest {
    ticker: string;
    interval: string;
    period?: Period;
    strategy?: Strategy;
    parameters?: Parameters;
    start?: Start;
    end?: End;
}

export interface GetSignalsSignalsGetRequest {
    ticker: string;
    interval: string;
    period?: Period;
    strategy?: Strategy;
    parameters?: Parameters;
    start?: Start;
    end?: End;
}

/**
 * 
 */
export class SignalsApi extends runtime.BaseAPI {

    /**
     * Backtest
     */
    async backtestSignalsBacktestGetRaw(requestParameters: BacktestSignalsBacktestGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BacktestResponseDTO>> {
        if (requestParameters['ticker'] == null) {
            throw new runtime.RequiredError(
                'ticker',
                'Required parameter "ticker" was null or undefined when calling backtestSignalsBacktestGet().'
            );
        }

        if (requestParameters['interval'] == null) {
            throw new runtime.RequiredError(
                'interval',
                'Required parameter "interval" was null or undefined when calling backtestSignalsBacktestGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['ticker'] != null) {
            queryParameters['ticker'] = requestParameters['ticker'];
        }

        if (requestParameters['period'] != null) {
            queryParameters['period'] = requestParameters['period'];
        }

        if (requestParameters['interval'] != null) {
            queryParameters['interval'] = requestParameters['interval'];
        }

        if (requestParameters['strategy'] != null) {
            queryParameters['strategy'] = requestParameters['strategy'];
        }

        if (requestParameters['parameters'] != null) {
            queryParameters['parameters'] = requestParameters['parameters'];
        }

        if (requestParameters['start'] != null) {
            queryParameters['start'] = requestParameters['start'];
        }

        if (requestParameters['end'] != null) {
            queryParameters['end'] = requestParameters['end'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/signals/backtest`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BacktestResponseDTOFromJSON(jsonValue));
    }

    /**
     * Backtest
     */
    async backtestSignalsBacktestGet(requestParameters: BacktestSignalsBacktestGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BacktestResponseDTO> {
        const response = await this.backtestSignalsBacktestGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get Signals
     */
    async getSignalsSignalsGetRaw(requestParameters: GetSignalsSignalsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SignalResponseDTO>> {
        if (requestParameters['ticker'] == null) {
            throw new runtime.RequiredError(
                'ticker',
                'Required parameter "ticker" was null or undefined when calling getSignalsSignalsGet().'
            );
        }

        if (requestParameters['interval'] == null) {
            throw new runtime.RequiredError(
                'interval',
                'Required parameter "interval" was null or undefined when calling getSignalsSignalsGet().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['ticker'] != null) {
            queryParameters['ticker'] = requestParameters['ticker'];
        }

        if (requestParameters['period'] != null) {
            queryParameters['period'] = requestParameters['period'];
        }

        if (requestParameters['interval'] != null) {
            queryParameters['interval'] = requestParameters['interval'];
        }

        if (requestParameters['strategy'] != null) {
            queryParameters['strategy'] = requestParameters['strategy'];
        }

        if (requestParameters['parameters'] != null) {
            queryParameters['parameters'] = requestParameters['parameters'];
        }

        if (requestParameters['start'] != null) {
            queryParameters['start'] = requestParameters['start'];
        }

        if (requestParameters['end'] != null) {
            queryParameters['end'] = requestParameters['end'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/signals/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SignalResponseDTOFromJSON(jsonValue));
    }

    /**
     * Get Signals
     */
    async getSignalsSignalsGet(requestParameters: GetSignalsSignalsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SignalResponseDTO> {
        const response = await this.getSignalsSignalsGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}