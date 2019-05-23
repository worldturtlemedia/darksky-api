import axios, { AxiosRequestConfig } from 'axios'

import { Forecast, ForecastRequest, RequestParams, TimeMachineRequest } from './types'
import { formatTimeMachineTime } from './util'

/**
 * Base url for the DarkSky API.
 *
 * @see https://darksky.net/dev/docs
 */
const API_BASE = 'https://api.darksky.net/forecast'

/**
 * Basic client definintion for interacting with the DarkSky API.
 */
export interface DarkSkyClient {
  /**
   * Make a Forecast request.
   *
   * @see https://darksky.net/dev/docs#forecast-request
   * @param request Forecast request data.
   * @param params Optional query params to add to the request.
   * @param requestConfig Optional config to change the way axios makes the request.
   */
  forecast: <R extends Forecast>(request: ForecastRequest, params?: RequestParams) => Promise<R>

  /**
   * Make a TimeMachine request.
   *
   * @see https://darksky.net/dev/docs#time-machine-request
   * @param request TimeMachine request data.
   * @param params Optional query params to add to the request.
   * @param requestConfig Optional config to change the way axios makes the request.
   */
  timeMachine: <R extends Forecast>(
    request: TimeMachineRequest,
    params?: RequestParams
  ) => Promise<R>
}

/**
 * Default implementation of ClientFactory for making authorized requests to the DarkSky API.
 *
 * Note: Get your token from {@link https://darksky.net/dev/account}.
 *
 * @param apiToken Developer API token.
 * @param requestConfig Optional config to change the way axios makes the request.
 * @returns Client for interacting with the API.
 */
export function createClient(
  apiToken: string,
  requestConfig: AxiosRequestConfig = {}
): DarkSkyClient {
  return {
    forecast: (request: ForecastRequest, params: RequestParams = {}) =>
      doRequest(apiToken, request, params, requestConfig),
    timeMachine: (request: TimeMachineRequest, params: RequestParams = {}) =>
      doRequest(apiToken, request, params, requestConfig)
  }
}

/**
 * Make the API request, and add the response headers to the result.
 *
 * @param R Type of response that extends Forecast.
 * @param apiToken Developer API token.
 * @param request Forecast request data.
 * @param params Optional query params to add to the request.
 * @param requestConfig Optional config to change the way axios makes the request.
 * @returns Forecast response with the HTTP headers.
 */
async function doRequest<R extends Forecast>(
  apiToken: string,
  request: ForecastRequest,
  params: RequestParams,
  requestConfig: AxiosRequestConfig
): Promise<R> {
  const url = `${createAPIUrl(apiToken, request)}${createQueryParams(params)}`
  const result = await axios.get<R>(url, requestConfig)

  return { ...result.data, headers: result.headers }
}

/**
 * Create the URL for the request which includes the api token, and location.
 *
 * @param token Developer API token.
 * @param request Required request options object.
 * @param request.latitude Target latitude location for the weather request.
 * @param request.longitude Target longitude location for the weather request.
 * @param request.rest Remaining properties of the request, used for getting the time if it is a TimeMachine request.
 * @returns URL string for making the request.
 */
function createAPIUrl(token: string, { latitude, longitude, ...rest }: ForecastRequest): string {
  const time = formatTimeMachineTime(rest as TimeMachineRequest)
  return `${API_BASE}/${token}/${latitude},${longitude}${time ? `,${time}` : ''}`
}

/**
 * Takes a params object and converts it to an HTTP query parameters string.
 *
 * ```typescript
 * const params: RequestParams = { exclude: ['hourly', 'daily'], lang: 'en' }
 * const query: string = createQueryParams(params)
 * // query = '?exclude=hourly,daily&lang=en'
 * ```
 *
 * @param obj Params object to convert into Query parameters.
 * @returns A query parameter string.
 */
function createQueryParams(obj: RequestParams) {
  const params = Object.keys(obj)
    .filter(key => typeof obj[key] !== 'undefined' && obj[key] !== null)
    .map(key => {
      const value = Array.isArray(obj[key]) ? obj[key].join(',') : (obj[key] as string)
      return `${key}=${encodeURIComponent(value)}`
    })
    .join('&')

  return params.length ? `?${params}` : ''
}
