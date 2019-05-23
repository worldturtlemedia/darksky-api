import { Alert } from './alerts'
import { DataBlock } from './datapoint'
import { Flags } from './flags'

/**
 * API Response.
 *
 * @see https://darksky.net/dev/docs#response-format
 */
export interface Forecast {
  /**
   * The requested latitude.
   */
  latitude: number

  /**
   * The requested longitude.
   */
  longitude: number

  /**
   * The IANA timezone name for the requested location.
   *
   * This is used for text summaries and for determining when hourly and
   * daily data block objects begin.
   */
  timezone: Timezone

  /**
   * A data point containing the current weather conditions at the requested location.
   */
  currently?: DataBlock

  /**
   * A data block containing the weather conditions minute-by-minute for the next hour.
   */
  minutely?: DataBlock

  /**
   * A data block containing the weather conditions hour-by-hour for the next two days.
   */
  hourly?: DataBlock

  /**
   * A data block containing the weather conditions day-by-day for the next week.
   */
  daily?: DataBlock

  /**
   * An alerts array, which, if present, contains any severe weather alerts pertinent to the requested location.
   */
  alerts?: Alert[]

  /**
   * A flags object containing miscellaneous metadata about the request.
   */
  flags?: Flags
}

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

  [key: string]: any
}
