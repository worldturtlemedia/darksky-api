import { Alert } from './alerts'
import { CurrentlyDataPoint, DailyDataBlock, HourlyDataBlock, MinutelyDataBlock } from './datapoint'
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
  timezone: string

  /**
   * A data point containing the current weather conditions at the requested location.
   */
  currently?: CurrentlyDataPoint

  /**
   * A data block containing the weather conditions minute-by-minute for the next hour.
   */
  minutely?: MinutelyDataBlock

  /**
   * A data block containing the weather conditions hour-by-hour for the next two days.
   */
  hourly?: HourlyDataBlock

  /**
   * A data block containing the weather conditions day-by-day for the next week.
   */
  daily?: DailyDataBlock

  /**
   * An alerts array, which, if present, contains any severe weather alerts pertinent to the requested location.
   */
  alerts?: Alert[]

  /**
   * A flags object containing miscellaneous metadata about the request.
   */
  flags?: Flags

  headers: ResponseHeaders
}

export interface CurrentForecast extends Forecast {
  currently: CurrentlyDataPoint
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
  'x-forecast-api-calls': string

  /**
   * The server-side response time of the request.
   */
  'x-response-time': string

  [key: string]: any
}
