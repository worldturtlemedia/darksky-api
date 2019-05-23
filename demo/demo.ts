import { createClient, Forecast, Units } from 'darksky-api'
import * as yargs from 'yargs'

const args = yargs.argv

const KEY = (args.key as string) || process.env.DARKSKY_KEY
if (!KEY) throw Error('DARKSKY_KEY was not found in the env')

const latitude = (args.lat as number) || 42.984
const longitude = (args.long as number) || -81.245
const targetDate = new Date(1558000000 * 1000)

createClient(KEY)
  .timeMachine({ latitude, longitude, time: targetDate }, { units: Units.CA })
  .then(result => {
    console.log(`At ${targetDate}`)
    logResult(result)
  })
  .catch(x => console.error(x.response ? x.response.data : x))

function logResult(result: Forecast) {
  console.log(`API Calls: ${result.headers['x-forecast-api-calls']}`)
  console.log(`Time: ${new Date(result!.currently!.time * 1000)}`)
  console.log(`Units: ${result!.flags!.units}`)
  console.log(`Current Temp: ${result!.currently!.temperature}`)
  console.log(`Daily High: ${result!.daily!.data[0].temperatureHigh}`)
  console.log(`Daily Low: ${result!.daily!.data[0].temperatureLow}`)
  if (result.minutely) {
    console.log(`Minutely Preceipitation %${result!.minutely!.data[0].precipIntensity}`)
  }
  if (result.alerts) {
    console.log(`Alerts: ${result.alerts.length}`)
  }
}
