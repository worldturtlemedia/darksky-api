import { PrecipitationType, WeatherIcon } from './weather'

/**
 * A data block object represents the various weather phenomena occurring over a period of time.
 *
 * @see https://darksky.net/dev/docs#data-block-object
 */
export interface DataBlock {
  /**
   * A human-readable summary of this data block.
   */
  summary: string

  /**
   * A machine-readable text summary of this data block.
   */
  icon: WeatherIcon

  /**
   * An array of data points, ordered by time, which together describe the weather conditions
   * at the requested location over time.
   */
  data: DataPoint[]
}

/**
 * A data point object contains various properties, each representing the average
 * (unless otherwise specified) of a particular weather phenomenon occurring during
 * a period of time: an instant in the case of currently, a minute for minutely, an
 * hour for hourly, and a day for daily.
 *
 * @see https://darksky.net/dev/docs#data-point-object
 */
export interface DataPoint {
  /**
   * The UNIX time at which this data point begins. minutely data point are always
   * aligned to the top of the minute, hourly data point objects to the top of the hour,
   * and daily data point objects to midnight of the day, all according to the local time zone.
   */
  time: number

  /**
   * The apparent (or “feels like”) temperature in degrees Fahrenheit.
   *
   * Note: Only on hourly.
   */
  apparentTemperature?: number

  /**
   * The daytime high apparent temperature.
   *
   * Note: Only on daily.
   */
  apparentTemperatureHigh?: number

  /**
   * The UNIX time representing when the daytime high apparent temperature occurs.
   *
   * Note: Only on daily.
   */
  apparentTemperatureHighTime?: number

  /**
   * The overnight low apparent temperature.
   *
   * Note: Only on daily.
   */
  apparentTemperatureLow?: number

  /**
   * The UNIX time representing when the overnight low apparent temperature occurs.
   *
   * Note: Only on daily.
   */
  apparentTemperatureLowTime?: number

  /**
   * The maximum apparent temperature during a given date.
   *
   * Note: Only on daily.
   */
  apparentTemperatureMax?: number

  /**
   * The UNIX time representing when the maximum apparent temperature during a given date occurs.
   *
   * Note: Only on daily.
   */
  apparentTemperatureMaxTime?: number

  /**
   * The minimum apparent temperature during a given date.
   *
   * Note: Only on daily.
   */
  apparentTemperatureMin?: number

  /**
   * The UNIX time representing when the minimum apparent temperature during a given date occurs.
   *
   * Note: Only on daily.
   */
  apparentTemperatureMinTime?: number

  /**
   * The percentage of sky occluded by clouds, between 0 and 1, inclusive.
   */
  cloudCover?: number

  /**
   * The dew point in degrees Fahrenheit (or specified units).
   */
  dewPoint?: number

  /**
   * The relative humidity, between 0 and 1, inclusive.
   */
  humidity?: number

  /**
   * A machine-readable text summary of this data point, suitable for selecting an icon for display.
   *
   * @see WeatherIcon
   */
  icon?: WeatherIcon

  /**
   * The fractional part of the lunation number during the given day: a value of 0 corresponds
   * to a new moon, 0.25 to a first quarter moon, 0.5 to a full moon, and 0.75 to a last quarter moon.
   *
   * The ranges in between these represent waxing crescent, waxing gibbous, waning gibbous,
   * and waning crescent moons, respectively.
   *
   * Note: Only on daily.
   */
  moonPhase?: number

  /**
   * The approximate direction of the nearest storm in degrees, with true north at 0° and
   * progressing clockwise.
   *
   * If [[nearestStormDistance]] is zero, then this value will not be defined.
   *
   * Note: Only on currently.
   */
  nearestStormBearing?: number

  /**
   * The approximate distance to the nearest storm in miles.
   *
   * A storm distance of 0 doesn’t necessarily refer to a storm at the requested location,
   * but rather a storm in the vicinity of that location.
   *
   * Note: Only on currently.
   */
  nearestStormDistance?: number

  /**
   * The columnar density of total atmospheric ozone at the given time in Dobson units.
   */
  ozone?: number

  /**
   * The amount of snowfall accumulation expected to occur, in inches.
   *
   * If no snowfall is expected, this property will not be defined.
   *
   * Note: Only on daily, hourly.
   */
  precipAccumulation?: number

  /**
   * The intensity of precipitation occurring at the given time.
   *
   * In inches (or specified units) of liquid water per hour.  This value is conditional on
   * probability (that is, assuming any precipitation occurs at all).
   */
  precipIntensity?: number

  /**
   * The standard deviation of the distribution of precipIntensity.
   *
   * We only return this property when the full distribution, and not merely the expected mean,
   * can be estimated with accuracy.
   */
  precipIntensityError?: number

  /**
   * The maximum value of [[precipIntensity]] during a given day.
   *
   * Note: Only on daily.
   */
  precipIntensityMax?: number

  /**
   * The UNIX time of when [[precipIntensityMax]] occurs during a given day.
   *
   * Note: Only on daily.
   */
  precipIntensityMaxTime?: number

  /**
   * The probability of precipitation occurring, between 0 and 1, inclusive.
   */
  precipProbability?: number

  /**
   * The type of precipitation occurring at the given time.
   *
   * If defined, this property will have one of the following values: "rain", "snow", or "sleet". If
   * precipIntensity is zero, then this property will not be defined.
   */
  precipType?: PrecipitationType

  /**
   * The sea-level air pressure in millibars.
   */
  pressure?: number

  /**
   * A human-readable text summary of this data point.
   */
  summary?: string

  /**
   * The UNIX time of when the sun will rise during a given day.
   *
   * Note: Only on daily.
   */
  sunriseTime?: number

  /**
   * The UNIX time of when the sun will set during a given day.
   *
   * Note: Only on daily.
   */
  sunsetTime?: number

  /**
   * The air temperature in degrees Fahrenheit (or specified units).
   *
   * Note: Only on hourly, currently.
   */
  temperature?: number

  /**
   * The daytime high temperature.
   *
   * Note: Only on daily.
   */
  temperatureHigh?: number

  /**
   * The UNIX time representing when the daytime high temperature occurs.
   *
   * Note: Only on daily.
   */
  temperatureHighTime?: number

  /**
   * The overnight low temperature.
   *
   * Note: Only on daily.
   */
  temperatureLow?: number

  /**
   * The UNIX time representing when the overnight low temperature occurs.
   *
   * Note: Only on daily.
   */
  temperatureLowTime?: number

  /**
   * The maximum temperature during a given date.
   *
   * Note: Only on daily.
   */
  temperatureMax?: number

  /**
   * The UNIX time representing when the maximum temperature during a given date occurs.
   *
   * Note: Only on daily.
   */
  temperatureMaxTime?: number

  /**
   * The minimum temperature during a given date.
   *
   * Note: Only on daily.
   */
  temperatureMin?: number

  /**
   * The UNIX time representing when the minimum temperature during a given date occurs.
   *
   * Note: Only on daily.
   */
  temperatureMinTime?: number

  /**
   * The UV index.
   */
  uvIndex?: number

  /**
   * The UNIX time of when the maximum [[uvIndex]] occurs during a given day.
   *
   * Note: Only on daily.
   */
  uvIndexTime?: number

  /**
   * The average visibility in miles, capped at 10 miles.
   */
  visibility?: number

  /**
   * The direction that the wind is coming from in degrees.
   *
   * With true north at 0° and progressing clockwise. If windSpeed is zero, then this value
   * will not be defined.
   */
  windBearing?: number

  /**
   * The wind gust speed in miles (or specified unit) per hour.
   */
  windGust?: number

  /**
   * The time at which the maximum wind gust speed occurs during the day.
   *
   * Note: Only on daily.
   */
  windGustTime?: number

  /**
   * The wind speed in miles (or specified unit) per hour.
   */
  windSpeed?: number
}

/**
 * A DataPoint that is returned from the Currently data block.
 *
 * @see DataPoint
 */
export interface CurrentlyDataPoint extends DataPoint {
  summary: string
  icon: WeatherIcon
  nearestStormDistance: number
  precipIntensity: number
  precipIntensityError: number
  precipProbability: number
  precipType: 'rain'
  temperature: number
  apparentTemperature: number
  dewPoint: number
  humidity: number
  pressure: number
  windSpeed: number
  windGust: number
  cloudCover: number
  uvIndex: number
  visibility: number
  ozone: number
}

/**
 * A DataBlock that is returned from the Minutely data block.
 *
 * @see DataBlock
 */
export interface MinutelyDataBlock extends DataBlock {
  data: MinutelyDataPoint[]
}

/**
 * A DataPoint that is returned from the Minutely data block.
 *
 * @see DataPoint
 */
export interface MinutelyDataPoint extends DataPoint {
  precipIntensity: number
  precipProbability: number
}

/**
 * A DataBlock that is returned from the Hourly data block.
 *
 * @see DataBlock
 */
export interface HourlyDataBlock extends DataBlock {
  data: HourlyDataPoint[]
}

/**
 * A DataPoint that is returned from the Hourly data block.
 *
 * @see DataPoint
 */
export interface HourlyDataPoint extends DataPoint {
  summary: string
  icon: WeatherIcon
  precipIntensity: number
  precipProbability: number
  temperature: number
  apparentTemperature: number
  dewPoint: number
  humidity: number
  pressure: number
  windSpeed: number
  windGust: number
  cloudCover: number
  uvIndex: number
  visibility: number
  ozone: number
}

/**
 * A DataBlock that is returned from the Daily data block.
 *
 * @see DataBlock
 */
export interface DailyDataBlock extends DataBlock {
  data: DailyDataPoint[]
}

/**
 * A DataPoint that is returned from the Daily data block.
 *
 * @see DataPoint
 */
export interface DailyDataPoint extends DataPoint {
  summary: string
  icon: WeatherIcon
  sunriseTime: number
  sunsetTime: number
  moonPhase: number
  precipIntensity: number
  precipIntensityMax: number
  precipIntensityMaxTime: number
  precipProbability: number
  temperatureHigh: number
  temperatureHighTime: number
  temperatureLow: number
  temperatureLowTime: number
  apparentTemperatureHigh: number
  apparentTemperatureHighTime: number
  apparentTemperatureLow: number
  apparentTemperatureLowTime: number
  dewPoint: number
  humidity: number
  pressure: number
  windSpeed: number
  windGust: number
  windGustTime: number
  cloudCover: number
  uvIndex: number
  uvIndexTime: number
  visibility: number
  ozone: number
  temperatureMin: number
  temperatureMinTime: number
  temperatureMax: number
  temperatureMaxTime: number
  apparentTemperatureMin: number
  apparentTemperatureMinTime: number
  apparentTemperatureMax: number
  apparentTemperatureMaxTime: number
}
