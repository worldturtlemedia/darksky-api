import axios from 'axios'
import format from 'date-fns/format'

import { DarkSky, DARKSKY_DATE_FORMAT, Exclude, Extend, Forecast, Language, Units } from '../src'
import { AxiosMock } from './__mocks__/axios'

jest.mock('axios')

const mockAxios = (axios as unknown) as AxiosMock

const BASE_RESPONSE: Forecast = {
  latitude: 42,
  longitude: 24,
  timezone: 'UTC',
  headers: {
    'x-forecast-api-calls': '',
    'x-response-time': ''
  }
}

describe('DarkSky', () => {
  beforeEach(() => {
    mockAxios.reset()
  })

  it('should not add params with an undefined object', async () => {
    await new DarkSky('token')
      .chain(42.24, -24.42)
      .language(Language.HINDI)
      .params()
      .execute()

    expect(mockAxios.get).toBeCalledWith(expect.stringContaining(`lang=${Language.HINDI}`), {})
  })

  it('should override override the options with helpers', async () => {
    await new DarkSky('token')
      .chain(42.24, -24.42)
      .params({ units: Units.CA })
      .units(Units.SI)
      .execute()

    expect(mockAxios.get).toBeCalledWith(expect.stringContaining(`units=${Units.SI}`), {})
  })

  it('should make a TimeMachine request', async () => {
    const expectedDate = format(2442 * 1000, DARKSKY_DATE_FORMAT)
    await new DarkSky('token')
      .chain(42.24, -24.42)
      .time(2442)
      .execute()

    expect(mockAxios.get).toBeCalledWith(expect.stringContaining(expectedDate), {})
  })

  it('should not include extend param if set to false', async () => {
    await new DarkSky('token')
      .chain(42.24, -24.42)
      .extendHourly(false)
      .execute()

    expect(mockAxios.get).toBeCalledWith(expect.not.stringMatching(/(extend=hourly)/), {})
  })

  it('should set the extend true as default', async () => {
    await new DarkSky('token')
      .chain(42.24, -24.42)
      .extendHourly()
      .execute()

    expect(mockAxios.get).toBeCalledWith(expect.stringMatching(/(extend=hourly)/), {})
  })

  it('should set only hourly extend it', async () => {
    await new DarkSky('token')
      .chain(42.24, -24.42)
      .onlyHourly(true)
      .execute()

    expect(mockAxios.get).toBeCalledWith(
      expect.stringMatching(/(extend=hourly)|currently|daily|minutely/),
      {}
    )
  })

  it('should exclude multple using varags then add another', async () => {
    await new DarkSky('token')
      .chain(42.24, -24.42)
      .excludeCurrently()
      .exclude(Exclude.ALERTS, Exclude.DAILY)
      .execute()

    const url = mockAxios.get.mock.calls[0][0]
    expect(url).toContain('exclude=')
    expect(url).toContain(Exclude.CURRENTLY)
    expect(url).toContain(Exclude.ALERTS)
    expect(url).toContain(Exclude.DAILY)
  })

  it('should exclude even with an undefined excludes array', async () => {
    await new DarkSky('token')
      .chain(42.24, -24.42)
      .params({ exclude: undefined })
      .exclude(Exclude.ALERTS)
      .execute()

    const url = mockAxios.get.mock.calls[0][0]
    expect(url).toContain(`exclude=${Exclude.ALERTS}`)
  })

  it('should exclude add up all the exclude calls', async () => {
    await new DarkSky('token')
      .chain(42.24, -24.42)
      .excludeAlerts()
      .excludeCurrently()
      .excludeDaily()
      .excludeFlags()
      .excludeHourly()
      .excludeMinutely()
      .execute()

    const url = mockAxios.get.mock.calls[0][0]
    expect(url).toContain('exclude=')
    expect(url).toContain(Exclude.ALERTS)
    expect(url).toContain(Exclude.CURRENTLY)
    expect(url).toContain(Exclude.DAILY)
    expect(url).toContain(Exclude.FLAGS)
    expect(url).toContain(Exclude.HOURLY)
    expect(url).toContain(Exclude.MINUTELY)
  })

  it('should only add an exclusion once', async () => {
    await new DarkSky('token')
      .chain(42.24, -24.42)
      .excludeAlerts()
      .excludeAlerts()
      .excludeAlerts()
      .execute()

    const url: string = mockAxios.get.mock.calls[0][0]
    expect(url).toContain('exclude=')
    expect((url.match(new RegExp(Exclude.ALERTS, 'g')) || []).length).toEqual(1)
  })
})
