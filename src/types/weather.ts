/**
 * A collection of all of the possible icon names returned from the DarkSky API.
 */
export enum WeatherIcon {
  CLEAR_DAY = 'clear-day',
  CLEAR_NIGHT = 'clear-night',
  RAIN = 'rain',
  SNOW = 'snow',
  SLEET = 'sleet',
  WIND = 'wind',
  FOG = 'fog',
  CLOUDY = 'cloudy',
  PARTLY_CLOUDY_DAY = 'partly-cloudy-day',
  PARTLY_CLOUDY_NIGHT = 'partly-cloudy-night',
  HAIL = 'hail',
  THUNDERSTORM = 'thunderstorm',
  TORNADO = 'tornado',
  UNKNOWN = 'unknown'
}

/**
 * All of the possible return types for precipitation type from the DarkSky API.
 */
export type PrecipitationType = 'rain' | 'snow' | 'sleet'
