import { Language } from './language'

export type NumberString = number | string

export type Latitude = NumberString

export type Longitude = NumberString

export type TimeMachineDate = string | number | Date

/**
 * Required parameters for making a Forecast request.
 *
 * @see https://darksky.net/dev/docs#forecast-request
 * @example https://api.darksky.net/forecast/[key]/[latitude],[longitude]
 */
export interface ForecastRequest {
  /**
   * The latitude of a location (in decimal degrees). Positive is north, negative is south.
   */
  latitude: Latitude

  /**
   * The longitude of a location (in decimal degrees). Positive is east, negative is west.
   */
  longitude: Longitude

  /**
   * Specific date to get weather for.
   *
   * Either be a UNIX timestamp or a string formatted as follows:
   *
   * ```typescript
   * // UNIX timestamp
   * { time: 1558575452 }
   *
   * // Date string
   * // [YYYY]-[MM]-[DD]T[HH]:[MM]:[SS][timezone].
   * { time: "2019-01-01T00:00:00+0400" }
   * ```
   *
   * Timezone should either be omitted (to refer to local time for the location being requested),
   * `Z` (referring to GMT time), or +[HH][MM] or -[HH][MM] for an offset from GMT
   * in hours and minutes.
   *
   * Note: The timezone is only used for determining the time of the request;
   * the response will always be relative to the local time zone.
   */
  time?: TimeMachineDate
}

/**
 * Required parameters for making a TimeMachine request.
 *
 * @see https://darksky.net/dev/docs#time-machine-request
 * @example https://api.darksky.net/forecast/[key]/[latitude],[longitude],[time]
 */
export interface TimeMachineRequest extends ForecastRequest {
  time: TimeMachineDate
}

/**
 * Optional HTTP query parameters for when making Forecast requests.
 */
export interface RequestParams {
  /**
   * Exclude some number of data blocks from the API response. This is useful for
   * reducing latency and saving cache space.
   */
  exclude?: Exclude[]

  /**
   * Return summary properties in the desired language.
   */
  lang?: Language

  /**
   * Return weather conditions in the requested units.
   */
  units?: Units

  /**
   * When present, return hour-by-hour data for the next 168 hours, instead of the next 48.
   */
  extend?: Extend
}

/**
 * Exclude some number of data blocks from the API response.
 *
 * This is useful for reducing latency and saving cache space.
 */
export enum Exclude {
  CURRENTLY = 'currently',
  MINUTELY = 'minutely',
  HOURLY = 'hourly',
  DAILY = 'daily',
  ALERTS = 'alerts',
  FLAGS = 'flags'
}

export const ONLY_CURRENTLY = [Exclude.DAILY, Exclude.MINUTELY, Exclude.HOURLY]

export const ONLY_DAILY = [Exclude.CURRENTLY, Exclude.MINUTELY, Exclude.HOURLY]

export const ONLY_MINUTELY = [Exclude.CURRENTLY, Exclude.DAILY, Exclude.HOURLY]

export const ONLY_HOURLY = [Exclude.CURRENTLY, Exclude.MINUTELY, Exclude.DAILY]

/**
 * Return weather conditions in the requested units.
 */
export enum Units {
  /**
   *  Automatically select units based on geographic location.
   */
  AUTO = 'auto',

  /**
   * Same as [[SI]], except that windSpeed and windGust are in kilometers per hour.
   */
  CA = 'ca',

  /**
   * Same as [[SI]], except that nearestStormDistance and visibility are in miles,
   * and windSpeed and windGust in miles per hour.
   */
  UK = 'uk2',

  /**
   * Imperial units.
   */
  US = 'us',

  /**
   * SI units.
   */
  SI = 'si'
}

export enum Extend {
  HOURLY = 'hourly'
}
