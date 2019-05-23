/**
 * The API will set the following HTTP response headers.
 *
 * @see https://darksky.net/dev/docs#response-headers
 */
export interface ResponseHeaders {
  /**
   * The number of API requests made by the given API key for today.
   */
  'X-Forecast-API-Calls': string

  /**
   * The server-side response time of the request.
   */
  'X-Response-Time': string
}
