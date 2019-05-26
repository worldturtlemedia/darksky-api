# DarkSky API Wrapper

A wrapper for [DarkSky API](https://darksky.net/dev/docs) written in TypeScript.

![CircleCI branch](https://img.shields.io/circleci/project/github/worldturtlemedia/darksky-api/master.svg?label=release%20build) ![CircleCI (all branches)](https://img.shields.io/circleci/project/github/worldturtlemedia/darksky-api.svg) [![Coverage Status](https://coveralls.io/repos/github/worldturtlemedia/darksky-api/badge.svg?branch=master)](https://coveralls.io/github/worldturtlemedia/darksky-api?branch=master)

[![npm version](https://badge.fury.io/js/darksky-api.svg)](https://badge.fury.io/js/darksky-api) ![GitHub](https://img.shields.io/github/license/worldturtlemedia/darksky-api.svg) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/darksky-api.svg)

[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![dependencies Status](https://david-dm.org/worldturtlemedia/darksky-api/status.svg)](https://david-dm.org/worldturtlemedia/darksky-api) [![devDependencies Status](https://david-dm.org/worldturtlemedia/darksky-api/dev-status.svg)](https://david-dm.org/worldturtlemedia/darksky-api?type=dev)

Usable in node and the browser. If used in a TypeScript project, you will get types, and auto-complete for all of the api responses. You will no longer need to tab back and fourth to the API documentation. Will work in Node or the browser!

This library makes interacting with the DarkSky API a little bit more friendly. It offers promises, request customization, and best of all response types.

If there are any features you would like, please feel free to open up an issue.

## Note

I did my best to correctly add types for all of the supported endpoints. However if you notice an incorrect payload type, or some missing properties, _please_ open up an issue, or submit a pull request.

## Installation

Add using yarn or npm

```bash
yarn add darksky-api
```

## Usage

Create an account on [DarkSky.net](https://darksky.net/dev/account), then get your API token.

There are a couple ways to use this library.

### TimeMachine request

Any request can be made into a TimeMachine request by passing `{ time: 'some-timestamp' }` into any function that accepts an optional `params` object.

The `time` property an be any of the following:

- Date object.
- A valid formatted date-string.
- UNIX timestamp.

Either be a UNIX timestamp or a string formatted as follows:

```typescript
// UNIX timestamp
{
  time: 1558575452
}

// Date string
// [YYYY]-[MM]-[DD]T[HH]:[MM]:[SS][timezone].
{
  time: '2019-01-01T00:00:00+0400'
}
```

The library will try it's best to parse the Date string you pass in, so you don't _need_ to supply it in the above format. But for safety its probably best.

> Timezone should either be omitted (to refer to local time for the location being requested),
> `Z` (referring to GMT time), or +[HH][mm] or -[HH][mm] for an offset from GMT
> in hours and minutes.

## 1. DarkSky class

Get instance of the factory. See [demo/demo_class.ts`](https://github.com/worldturtlemedia/darksky-api/blob/master/demo/demo_class.ts)

Use any of the DarkSky helper functions (see below).

```typescript
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
async function getWeeklyForecast(lat: number, lng: number): Promise<WeekForecast> {
  try {
    // You can pass options here to override the options set above
    const result: WeekForecast = await darksky.week(lat, lng, { lang: Language.ENGLISH })
    console.log(`Got forecast for ${result.latitude}-${result.longitude}`)
    return result
  } catch (error) {
    // If DarkSky API doesn't return a 'daily' data-block, then this function will throw
    console.log('Unable to get the weekly forecast for the chosen location')
  }
}

;(async () => {
  const forecast = await getWeeklyForecast(42, 24)

  console.log(`Forecast for tomorrow: ${forecast.daily.data[1].temperatureMax}`)
})()
```

## 2. Chaining

You can build a request by using method chaining and a builder pattern.

```typescript
// Using helper function
import { createRequestChain } from 'darksky-api'

createRequestChain('api-key', 42, 24)
  .extendHourly()
  .onlyHourly()
  .excludeFlags()
  .excludeAlerts()
  .execute()
  .then(console.log)
  .catch(console.log)

// Using the DarkSky class
new DarkSky('api-key')
  .chain(42, 24)
  .time('May 05 2019') // Library will try it's best to parse this date string
  .units(Units.UK)
  .execute()
  .then(console.log)
  .catch(console.log)
```

## 3. Manual DarkSky client

This library also exports a minimal DarkSky wrapper, where you can manually create the requests.

```typescript
import { createClient } from 'darksky-api'

const targetDate = new Date(1558000000 * 1000)

createClient('api-key')
  .timeMachine({ latitude: 42, longitude: 24, time: targetDate }, { units: Units.CA })
  .then(console.log)
  .catch(console.log)
```

## DarkSky class helper methods

Optional settings when creating a new wrapper:

```typescript
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
   */
  exclude?: Exclude[]

  /**
   * Optional config to change the way axios makes the request.
   */
  requestConfig?: AxiosRequestConfig
}
```

All helper methods require the location `latitude: number, longitude: number`, and can take an optional settings object.

If you need the forecast for a specific date and time, you can use DarkSky's TimeMachine functionality by passing a `time` property to each helper function, example:

```typescript
new DarkSky('api-key').week(42, 24, { time: 'May 5 2018' })
```

| Name            |    Optional     |               Returns |
| --------------- | :-------------: | --------------------: |
| `chain()`       | `RequestParams` | `DarkSkyRequestChain` |
| `forecast()`    | `RequestParams` |            `Forecast` |
| `timeMachine()` | `RequestParams` |            `Forecast` |
| `current()`     | `RequestParams` |     `CurrentForecast` |
| `week()`        | `RequestParams` |        `WeekForecast` |
| `day()`         | `RequestParams` |         `DayForecast` |
| `hour()`        | `RequestParams` |        `HourForecast` |

`chain()` is a special function that allows you to create a `DarkSkyRequestChain` to build your own request, see the example above.

## Demo

Demos are available in the `demo/` folder. You will _NEED_ a DarkSky API key for the demos to work. Then you can either set it in your env, or pass it as an CLI argument. See the example below.

**Note:** I recommend [VSCode](https://code.visualstudio.com/) for viewing and editing the examples. It will give you great intellisense about the library.

Follow the steps below:

```bash
# Get a API token from DarkSky.net

# Either set it in your env
export DARKSKY_KEY=your-token

# or pass it as a cli argument
# npx ts-node --project ../tsconfig.base.json demo_[demo name].ts --key your-key

# Build the library
yarn && yarn build

# Change into demo folder and install dependencies
cd demo
yarn

# Typescript example:
npx ts-node --project ../tsconfig.base.json demo_[demo name].ts

# To view Browser example, first build project
yarn build

# Then open `index.html` in your browser
```

## Contributing

See [CONTRIBUTING](https://github.com/worldturtlemedia/darksky-api/blob/master/CONTRIBUTING.md).

## License

```text
MIT License

Copyright (c) 2019 WorldTurtleMedia

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
