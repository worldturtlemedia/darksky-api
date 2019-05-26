import { DarkSky, DarkSkyOptions, Language, Units, WeekForecast } from 'darksky-api'
import * as yargs from 'yargs'

const args = yargs.argv

const KEY = (args.key as string) || process.env.DARKSKY_KEY
if (!KEY) throw Error('DARKSKY_KEY was not found in the env')

const latitude = (args.lat as number) || 42.984
const longitude = (args.long as number) || -81.245

// Optional Default options
const options: DarkSkyOptions = {
  // Optional
  // Anything set here can be overriden when making the request

  units: Units.SI,
  lang: Language.FRENCH
}

// Create the api wrapper class
const darksky = new DarkSky(KEY, options)

// Use the wrapper

/**
 * Will get the weekly forecast using a helper function, it excludes all of the datablocks except
 * for the `daily` one.  If you need more than that you can use `DarkSky.forecast` and pass in
 * an Exclude array.
 */
async function getWeeklyForecast(lat: number, lng: number): Promise<WeekForecast | undefined> {
  try {
    // You can pass options here to override the options set above
    const result: WeekForecast = await darksky.week(lat, lng, { lang: Language.ENGLISH })
    console.log(`Got forecast for ${result.latitude},${result.longitude}`)
    return result
  } catch (error) {
    // If DarkSky API doesn't return a 'daily' data-block, then this function will throw
    console.log('Unable to get the weekly forecast for the chosen location')
    console.error(error)
  }
}

(async () => {
  const forecast = await getWeeklyForecast(latitude, longitude)
  if (!forecast) return console.error('unable to get forecast')

  console.log(`Forecast for tomorrow: ${forecast.daily.data[1].temperatureMax}`)
})()
