import { AxiosRequestConfig } from 'axios'

import { createClient, DarkSkyClient } from '../client'
import { Exclude, Extend, Language, RequestParams, Units } from '../types'

/**
 * Options object for configuring an instance of `DarkSkyBase`.
 */
export interface DarkSkyOptions {
  /**
   * Return weather conditions in the requested units.
   *
   * @default Units.AUTO
   */
  units?: Units

  /**
   * Return summary properties in the desired language.
   *
   * @default Language.ENGLISH
   */
  lang?: Language

  /**
   * When true, return hour-by-hour data for the next 168 hours, instead of the next 48.
   *
   * @default false
   */
  extendHourly?: boolean

  /**
   * Exclude some number of data blocks from the API response.
   *
   * @default []
   */
  exclude?: Exclude[]

  /**
   * Optional config to change the way axios makes the request.
   */
  requestConfig?: AxiosRequestConfig
}

/**
 * Base class for creating a wrapper for DarkSky and `DarkSkyClient`
 *
 * @private
 */
export class DarkSkyBase {
  /**
   * DarkSky developer API token.
   */
  protected readonly token: string

  /**
   * Client for interacting with the API.
   */
  protected readonly client: DarkSkyClient

  /**
   * Optional request paramaters.
   */
  protected requestParams: RequestParams

  /**
   * Create the base class.
   *
   * @param token DarkSky developer API token.
   * @param requestParams Provide sensible defaults for the request.
   */
  constructor(
    token: string,
    {
      units = Units.AUTO,
      lang = Language.ENGLISH,
      extendHourly = false,
      exclude,
      requestConfig
    }: DarkSkyOptions = {}
  ) {
    this.token = token
    this.client = createClient(token, requestConfig)
    this.requestParams = { units, lang, exclude, extend: extendHourly ? Extend.HOURLY : undefined }
  }
}
