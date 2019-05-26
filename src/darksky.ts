import { notFound } from './misc/errors'
import {
  CurrentForecast,
  DayForecast,
  HourForecast,
  NumberString,
  RequestParams,
  TimeMachineDate,
  WeekForecast
} from './types'
import { DarkSkyBase } from './wrapper/base'
import { createRequestChain } from './wrapper/chain'

/**
 * A `class` based wrapper for a `DarkSkyClient`
 *
 * Example usage:
 *
 * ```typescript
 * const darkSky = new DarkSky("api-token")
 *
 * const current = async () => {
 *   const result = await darkSky.currentConditions(42, -42, { units: Units.CA })
 *   // ... Handle result
 * }
 * ```
 *
 * Example chaining usage:
 *
 * ```typescript
 * const darkSky = new DarkSky("api-token")
 *
 * const hourlyForecast = darkSky.chain(42, -42).extendHourly().onlyHourly()
 *
 * async function getHourlyForecast(lat: number, long: number): HourlyDataBlock {
 *   const result = await hourlyForecast.execute()
 *   if (!result.hourly) {
 *     throw Error("Hourly can still be undefined if DarkSky doesn't return it")
 *   }
 *   return result.hourly
 * }
 * ```
 */
export class DarkSky extends DarkSkyBase {
  /**
   * Create a DarkSky request using method chaining.
   *
   * @see createRequestChain
   * @param latitude The latitude of a location (in decimal degrees).
   * @param longitude The longitude of a location (in decimal degrees).
   * @param params Optional query params for the request.
   */
  chain(latitude: NumberString, longitude: NumberString, params?: RequestParams) {
    return createRequestChain(this.token, latitude, longitude).params({
      ...this.requestParams,
      ...(params || {})
    })
  }

  /**
   *  Gets the current forecast.
   *
   * @param latitude The latitude of a location (in decimal degrees).
   * @param longitude The longitude of a location (in decimal degrees).
   * @param params Optional query params for the request.
   * @returns Current forecast.
   */
  forecast(latitude: number, longitude: number, params?: RequestParams) {
    return this.client.forecast(
      { latitude, longitude },
      { ...this.requestParams, ...(params || {}) }
    )
  }

  /**
   *  Gets the forecast for a specified date.
   *
   * @param latitude The latitude of a location (in decimal degrees).
   * @param longitude The longitude of a location (in decimal degrees).
   * @param time Specific time to get the weather for.
   * @param params Optional query params for the request.
   * @returns Forecast for the specified date.
   */
  timeMachine(latitude: number, longitude: number, time: TimeMachineDate, params?: RequestParams) {
    return this.client.timeMachine(
      { latitude, longitude, time },
      { ...this.requestParams, ...(params || {}) }
    )
  }

  /**
   * Gets the current weather conditions, excluding all other datablocks.
   *
   * Helper function for setting `exclude=minutely,daily,hourly`
   *
   * * Note: Will throw an error if DarkSky doesn't return a `currently` data block for the request.
   *
   * @param latitude The latitude of a location (in decimal degrees).
   * @param longitude The longitude of a location (in decimal degrees).
   * @param params Optional query params for the request.
   * @returns Current forecast conditions.
   * @throws HttpException if `Forecast.currently` doesn't exist.
   */
  async current(latitude: number, longitude: number, params?: RequestParams) {
    const result = await this.chain(latitude, longitude, params)
      .onlyCurrently()
      .execute()

    if (!result.currently) throw notFound()

    return result as CurrentForecast
  }

  /**
   * Get the forecast for week, excluding all other datablocks.
   *
   * Helper function for setting `exclude=currently,minutely,hourly`
   *
   * * Note: Will throw an error if DarkSky doesn't return a `daily` data block for the request.
   *
   * @param latitude The latitude of a location (in decimal degrees).
   * @param longitude The longitude of a location (in decimal degrees).
   * @param params Optional query params for the request.
   * @returns Forecast for the week.
   * @throws HttpException if [[Forecast.daily]] doesn't exist.
   */
  async week(latitude: number, longitude: number, params?: RequestParams) {
    const result = await this.chain(latitude, longitude, params)
      .onlyDaily()
      .execute()

    if (!result.daily) throw notFound()

    return result as WeekForecast
  }

  /**
   * Get the forecast for day, excluding all other datablocks.
   *
   * Helper function for setting `exclude=currently,daily,minutely`
   *
   * * Note: Will throw an error if DarkSky doesn't return a `hourly` data block for the request.
   *
   * @param latitude The latitude of a location (in decimal degrees).
   * @param longitude The longitude of a location (in decimal degrees).
   * @param params Optional query params for the request.
   * @returns Forecast for the day.
   * @throws HttpException if [[Forecast.hourly]] doesn't exist.
   */
  async day(latitude: number, longitude: number, params?: RequestParams) {
    const result = await this.chain(latitude, longitude, params)
      .onlyHourly()
      .execute()

    if (!result.hourly) throw notFound()

    return result as DayForecast
  }

  /**
   * Get the forecast for hour, excluding all other datablocks.
   *
   * Helper function for setting `exclude=currently,daily,hourly`
   *
   * * Note: Will throw an error if DarkSky doesn't return a `Minutely` data block for the request.
   *
   * @param latitude The latitude of a location (in decimal degrees).
   * @param longitude The longitude of a location (in decimal degrees).
   * @param params Optional query params for the request.
   * @returns Forecast for the hour.
   * @throws HttpException if [[Forecast.Minutely]] doesn't exist.
   */
  async hour(latitude: number, longitude: number, params?: RequestParams) {
    const result = await this.chain(latitude, longitude, params)
      .onlyMinutely()
      .execute()

    if (!result.minutely) throw notFound()

    return result as HourForecast
  }
}
