import { AxiosRequestConfig } from 'axios'

import {
  Forecast,
  ForecastParams,
  ForecastRequest,
  RequestParams,
  TimeMachineRequest
} from './types'

const API_BASE = 'https://api.darksky.net/forecast'

export interface ClientFactory {
  forecast: (
    request: ForecastRequest,
    params?: ForecastParams,
    requestConfig?: AxiosRequestConfig
  ) => Promise<Forecast>
  timeMachine: (
    request: TimeMachineRequest,
    params?: RequestParams,
    requestConfig?: AxiosRequestConfig
  ) => Promise<Forecast>
}

export function client(apiToken: string): ClientFactory {
  return {
    forecast: async (
      request: ForecastRequest,
      params: ForecastParams = {},
      requestConfig: AxiosRequestConfig = {}
    ) => {
      return Promise<Forecast>()
    },
    timeMachine: async (
      request: TimeMachineRequest,
      params: RequestParams = {},
      requestConfig: AxiosRequestConfig = {}
    ) => {
      return Promise<Forecast>()
    }
  }
}

function createAPIUrl(
  token: string,
  { latitude, longitude, ...rest }: ForecastRequest | TimeMachineRequest
): string {
  const time = (rest as TimeMachineRequest).time
  return `${API_BASE}/${token}/${latitude},${longitude},${time}`
}
