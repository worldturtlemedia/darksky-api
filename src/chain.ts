import { DarkSkyBase, DarkSkyOptions } from './darksky'
import {
  Exclude,
  Extend,
  Language,
  Latitude,
  Longitude,
  ONLY_CURRENTLY,
  ONLY_DAILY,
  ONLY_HOURLY,
  ONLY_MINUTELY,
  RequestParams,
  TimeMachineDate,
  Units
} from './types'

/**
 * @private
 */
export class DarkSkyRequestChain extends DarkSkyBase {
  private options: Partial<DarkSkyOptions> = {}

  constructor(
    token: string,
    latitude: Latitude,
    longitude: Longitude,
    options: Partial<DarkSkyOptions> = {}
  ) {
    super(token, options)
    this.options = { ...options, latitude, longitude }
  }

  params(params: RequestParams) {
    this.requestParams = params
    return this
  }

  time(time: TimeMachineDate) {
    this.options.time = time
    return this
  }

  units(units: Units) {
    this.requestParams.units = units
    return this
  }

  language(language: Language) {
    this.requestParams.lang = language
    return this
  }

  extendHourly(extend: boolean = true) {
    this.requestParams.extend = extend ? Extend.HOURLY : undefined
    return this
  }

  exclude(...exclude: Exclude[]) {
    this.requestParams.exclude = exclude
    return this
  }

  onlyCurrently() {
    this.requestParams.exclude = ONLY_CURRENTLY
    return this
  }

  onlyMinutely() {
    this.requestParams.exclude = ONLY_MINUTELY
    return this
  }

  onlyHourly() {
    this.requestParams.exclude = ONLY_HOURLY
    return this
  }

  onlyDaily() {
    this.requestParams.exclude = ONLY_DAILY
    return this
  }

  execute() {
    const { latitude, longitude, time } = this.options

    if (!latitude || !longitude) {
      throw Error('Both `latitude` and `longitude` are required, ensure you called `coordinates()')
    }

    return time
      ? this.client.timeMachine({ latitude, longitude, time }, this.requestParams)
      : this.client.forecast({ latitude, longitude }, this.requestParams)
  }
}

export function createRequestChain(
  token: string,
  latitude: Latitude,
  longitude: Longitude,
  options?: Partial<DarkSkyOptions>
) {
  return new DarkSkyRequestChain(token, latitude, longitude, options)
}
