import { createRequestChain, DarkSky, Exclude, Forecast, Units } from 'darksky-api'
import * as yargs from 'yargs'

const args = yargs.argv

const KEY = (args.key as string) || process.env.DARKSKY_KEY
if (!KEY) throw Error('DARKSKY_KEY was not found in the env')

const latitude = (args.lat as number) || 42.984
const longitude = (args.long as number) || -81.245
const targetDate = new Date(1558000000 * 1000)

// Chain method
createRequestChain(KEY, latitude, longitude)
  .extendHourly()
  .exclude(Exclude.CURRENTLY, Exclude.MINUTELY, Exclude.HOURLY)
  .time(targetDate)
  .units(Units.CA)
  .execute()
  .then(result => {
    console.log(`At ${targetDate}`)
    logResult(result)
  })
  .catch(console.error)

// Using class
new DarkSky(KEY)
  .chain(latitude, longitude)
  .params({ units: Units.CA })
  .onlyDaily()
  .execute()
  .then(logResult)
  .catch(console.error)

function logResult(result: Forecast) {
  console.log(`API Calls: ${result.headers['x-forecast-api-calls']}`)
  console.log(`Units: ${result!.flags!.units}`)
  console.log(`Daily High: ${result!.daily!.data[0].temperatureHigh}`)
  console.log(`Daily Low: ${result!.daily!.data[0].temperatureLow}`)
  if (result.alerts) {
    console.log(`Alerts: ${result.alerts.length}`)
  }
}
