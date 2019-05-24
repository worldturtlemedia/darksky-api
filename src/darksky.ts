import { AxiosRequestConfig } from 'axios'

import { createClient, DarkSkyClient } from './client'
import { notFound } from './errors'
import {
  CurrentForecast,
  Exclude,
  Extend,
  Language,
  Latitude,
  Longitude,
  RequestParams,
  TimeMachineDate,
  Units
} from './types'

export interface DarkSkyOptions {
  latitude: Latitude
  longitude: Longitude
  time: TimeMachineDate
  units: Units
  lang: Language
  extendHourly: boolean
  exclude: Exclude[]
  requestConfig?: AxiosRequestConfig
}

export class DarkSkyBase {
  protected readonly client: DarkSkyClient
  protected requestParams: RequestParams

  constructor(
    token: string,
    {
      units = Units.AUTO,
      lang = Language.ENGLISH,
      extendHourly = false,
      exclude = [],
      requestConfig
    }: Partial<DarkSkyOptions> = {}
  ) {
    this.client = createClient(token, requestConfig)
    this.requestParams = { units, lang, exclude, extend: extendHourly ? Extend.HOURLY : undefined }
  }
}

export class DarkSky extends DarkSkyBase {
  forecast(latitude: number, longitude: number, params?: RequestParams) {
    return this.client.forecast(
      { latitude, longitude },
      { ...this.requestParams, ...(params || {}) }
    )
  }

  /**
   *
   * @param latitude
   * @param longitude
   * @param params
   * @returns Current forecast conditions.
   * @throws HttpException if `Forecast.currently` doesn't exist.
   */
  async currentConditions(latitude: number, longitude: number, params?: RequestParams) {
    const result = await this.client.forecast(
      { latitude, longitude },
      {
        ...this.requestParams,
        ...(params || {}),
        exclude: [Exclude.DAILY, Exclude.HOURLY, Exclude.MINUTELY]
      }
    )

    if (result.currently) throw notFound()

    return result as CurrentForecast
  }
}
