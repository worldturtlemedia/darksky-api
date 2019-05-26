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

  it('should make a forecast request', async () => {
    await new DarkSky('token').forecast(42, 24)

    expect(mockAxios.get).toBeCalledWith(expect.stringContaining('42,24'), {})
  })

  it('should make forecast request and override default params', async () => {
    await new DarkSky('token', { units: Units.SI }).forecast(42, 24, { units: Units.US })

    expect(mockAxios.get).toBeCalledWith(expect.stringContaining(`units=${Units.US}`), {})
  })

  it('should make a time machine request', async () => {
    await new DarkSky('token').timeMachine(42, 24, 4224)

    const expectedDate = format(new Date(4224 * 1000), DARKSKY_DATE_FORMAT)
    expect(mockAxios.get).toBeCalledWith(expect.stringContaining(`42,24,${expectedDate}`), {})
  })

  it('should make forecast request and override default params', async () => {
    await new DarkSky('token', { lang: Language.HINDI }).timeMachine(42, 24, 4224, {
      lang: Language.GREEK
    })

    expect(mockAxios.get).toBeCalledWith(expect.stringContaining(`lang=${Language.GREEK}`), {})
  })

  it('should chain with no optional params', async () => {
    await new DarkSky('token').chain(42, 24).execute()

    expect(mockAxios.get).toBeCalledWith(expect.stringContaining(`units=${Units.AUTO}`), {})
  })

  describe('Current forecast', () => {
    it('should handle successful current forecast', async () => {
      const forecast: any = {
        ...BASE_RESPONSE,
        currently: {}
      }
      mockAxios._setMockResponse({ data: forecast })

      await expect(new DarkSky('token').current(42, 24)).resolves.not.toThrow()
      expect(mockAxios.get).toBeCalledWith(expect.not.stringContaining(Exclude.CURRENTLY), {})
    })

    it('should handle a failed current forecast', async () => {
      mockAxios._setMockResponse({ data: BASE_RESPONSE })

      await expect(new DarkSky('token').current(42, 24)).rejects.toThrow()
      expect(mockAxios.get).toBeCalledWith(expect.not.stringContaining(Exclude.CURRENTLY), {})
    })

    it('should handle optional params in constructor', async () => {
      try {
        await new DarkSky('token', { units: Units.SI }).current(42, 24)
      } catch (err) {
        // noop
      }

      expect(mockAxios.get).toBeCalledWith(expect.stringContaining(`units=${Units.SI}`), {})
    })

    it('should handle optional params in the function call', async () => {
      try {
        await new DarkSky('token', { units: Units.SI }).current(42, 24, {
          lang: Language.HINDI,
          units: Units.UK
        })
      } catch (err) {
        // noop
      }

      expect(mockAxios.get).toBeCalledWith(
        expect.stringContaining(`units=${Units.UK}&lang=${Language.HINDI}`),
        {}
      )
    })
  })

  describe('Week forecast', () => {
    it('should handle successful weekly forecast', async () => {
      const forecast: any = {
        ...BASE_RESPONSE,
        daily: [{}]
      }
      mockAxios._setMockResponse({ data: forecast })

      await expect(new DarkSky('token').week(42, 24)).resolves.not.toThrow()
      expect(mockAxios.get).toBeCalledWith(expect.not.stringContaining(Exclude.DAILY), {})
    })

    it('should handle a failed weekly forecast', async () => {
      mockAxios._setMockResponse({ data: BASE_RESPONSE })

      await expect(new DarkSky('token').week(42, 24)).rejects.toThrow()
      expect(mockAxios.get).toBeCalledWith(expect.not.stringContaining(Exclude.DAILY), {})
    })

    it('should handle optional params in constructor', async () => {
      try {
        await new DarkSky('token', { units: Units.SI }).week(42, 24)
      } catch (err) {
        // noop
      }

      expect(mockAxios.get).toBeCalledWith(expect.stringContaining(`units=${Units.SI}`), {})
    })

    it('should handle optional params in the function call', async () => {
      try {
        await new DarkSky('token', { units: Units.SI }).week(42, 24, {
          lang: Language.HINDI,
          units: Units.UK
        })
      } catch (err) {
        // noop
      }

      expect(mockAxios.get).toBeCalledWith(
        expect.stringContaining(`units=${Units.UK}&lang=${Language.HINDI}`),
        {}
      )
    })
  })

  describe('Day forecast', () => {
    it('should handle successful daily forecast', async () => {
      const forecast: any = {
        ...BASE_RESPONSE,
        hourly: [{}]
      }
      mockAxios._setMockResponse({ data: forecast })

      await expect(new DarkSky('token').day(42, 24)).resolves.not.toThrow()
      expect(mockAxios.get).toBeCalledWith(
        expect.stringContaining(
          `exclude=${Exclude.CURRENTLY}%2C${Exclude.DAILY}%2C${Exclude.MINUTELY}`
        ),
        {}
      )
    })

    it('should handle a failed daily forecast', async () => {
      mockAxios._setMockResponse({ data: BASE_RESPONSE })

      await expect(new DarkSky('token').day(42, 24)).rejects.toThrow()
      expect(mockAxios.get).toBeCalledWith(
        expect.stringContaining(
          `exclude=${Exclude.CURRENTLY}%2C${Exclude.DAILY}%2C${Exclude.MINUTELY}`
        ),
        {}
      )
    })

    it('should extend the daily forecast', async () => {
      await expect(
        new DarkSky('token', { extendHourly: true, units: Units.UK }).day(42, 24)
      ).rejects.toThrow()

      expect(mockAxios.get).toBeCalledWith(expect.stringContaining(`extend=${Extend.HOURLY}`), {})
    })

    it('should handle optional params in the function call', async () => {
      try {
        await new DarkSky('token', { units: Units.SI }).day(42, 24, {
          lang: Language.HINDI,
          units: Units.UK
        })
      } catch (err) {
        // noop
      }

      expect(mockAxios.get).toBeCalledWith(
        expect.stringContaining(`units=${Units.UK}&lang=${Language.HINDI}`),
        {}
      )
    })
  })

  describe('Hour forecast', () => {
    it('should handle successful hourly forecast', async () => {
      const forecast: any = {
        ...BASE_RESPONSE,
        minutely: [{}]
      }
      mockAxios._setMockResponse({ data: forecast })

      await expect(new DarkSky('token').hour(42, 24)).resolves.not.toThrow()
      expect(mockAxios.get).toBeCalledWith(expect.not.stringContaining(Exclude.MINUTELY), {})
    })

    it('should handle a failed hourly forecast', async () => {
      mockAxios._setMockResponse({ data: BASE_RESPONSE })

      await expect(new DarkSky('token').hour(42, 24)).rejects.toThrow()
      expect(mockAxios.get).toBeCalledWith(expect.not.stringContaining(Exclude.MINUTELY), {})
    })

    it('should handle optional params in constructor', async () => {
      try {
        await new DarkSky('token', { units: Units.SI }).hour(42, 24)
      } catch (err) {
        // noop
      }

      expect(mockAxios.get).toBeCalledWith(expect.stringContaining(`units=${Units.SI}`), {})
    })

    it('should handle optional params in the function call', async () => {
      try {
        await new DarkSky('token', { units: Units.SI }).hour(42, 24, {
          lang: Language.HINDI,
          units: Units.UK
        })
      } catch (err) {
        // noop
      }

      expect(mockAxios.get).toBeCalledWith(
        expect.stringContaining(`units=${Units.UK}&lang=${Language.HINDI}`),
        {}
      )
    })
  })
})
