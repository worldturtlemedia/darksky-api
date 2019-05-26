import axios from 'axios'
import * as format from 'date-fns/format'

import { DARKSKY_DATE_FORMAT, Exclude, Language, Units } from '../src'
import { createClient } from '../src/client'
import { AxiosMock } from './__mocks__/axios'

jest.mock('axios')

const mockAxios = (axios as unknown) as AxiosMock

const API_BASE = 'https://api.darksky.net/forecast'

describe('Client', () => {
  beforeEach(() => {
    mockAxios.reset()
  })

  it('should create a client', () => {
    const client = createClient('token')
    expect(client.forecast).toBeDefined()
    expect(client.timeMachine).toBeDefined()
  })

  it('should throw an error if latitude is not supplied', async () => {
    const client = createClient('token')

    await expect(client.forecast({ longitude: 42 } as any)).rejects.toThrow()
  })

  it('should make a forecast request with the specified params', async () => {
    await createClient('token', { timeout: 1000 }).forecast({ latitude: 42, longitude: 24 })
    expect(mockAxios.get).toBeCalledWith(`${API_BASE}/token/42,24`, { timeout: 1000 })
  })

  it('should make a forecast request with optional params', async () => {
    await createClient('token').forecast(
      { latitude: 42, longitude: 24 },
      { lang: Language.ENGLISH }
    )

    expect(mockAxios.get).toBeCalledWith(`${API_BASE}/token/42,24?lang=en`, {})
  })

  it('should make a time machine request', async () => {
    await createClient('token').timeMachine({ latitude: 42, longitude: 24, time: 4224 })

    const expectedDate = format(new Date(4224 * 1000), DARKSKY_DATE_FORMAT)
    expect(mockAxios.get).toBeCalledWith(`${API_BASE}/token/42,24,${expectedDate}`, {})
  })

  it('should add the optional params to the time machine request', async () => {
    await createClient('token').timeMachine(
      { latitude: 42, longitude: 24, time: 4224 },
      { units: Units.CA, exclude: [Exclude.DAILY, Exclude.FLAGS] }
    )

    const expectedDate = format(new Date(4224 * 1000), DARKSKY_DATE_FORMAT)
    expect(mockAxios.get).toBeCalledWith(
      `${API_BASE}/token/42,24,${expectedDate}?units=ca&exclude=daily%2Cflags`,
      {}
    )
  })
})
