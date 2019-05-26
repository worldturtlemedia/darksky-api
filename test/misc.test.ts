import format from 'date-fns/format'

import { HttpException } from '../src/misc/errors'
import {
  DARKSKY_DATE_FORMAT,
  formatDateString,
  formatTimeMachineTime,
  isNumber,
  isString
} from '../src/misc/util'

describe('Misc', () => {
  describe('Errors', () => {
    it('should create an HttpException', () => {
      const error = new HttpException(404, 'Message')
      expect(error.message).toEqual('Message')
    })

    it('should create an HttpException with a message containing data', () => {
      const error = new HttpException(404, 'Message', 'data')
      expect(error.message).toEqual('Message\ndata')
    })
  })

  describe('Util', () => {
    describe('isString', () => {
      it('should return true on a valid string', () => {
        expect(isString('I am a string')).toBeTruthy()
      })

      it('should return false on any other type', () => {
        expect(isString(42)).toBeFalsy()
        expect(isString({})).toBeFalsy()
        expect(isString([42])).toBeFalsy()
      })
    })

    describe('isNumber', () => {
      it('should be true if it is a valid number', () => {
        expect(isNumber(42)).toBeTruthy()
        expect(isNumber(-42)).toBeTruthy()
        expect(isNumber(42.24)).toBeTruthy()
        expect(isNumber(-42.24)).toBeTruthy()
      })

      it('should parse a number string', () => {
        expect(isNumber('42')).toBeTruthy()
      })

      it('should be false if passed an invalid number string', () => {
        expect(isNumber('foo')).toBeFalsy()
        expect(isNumber('')).toBeFalsy()
      })
    })

    describe('formatTimeMachineTime', () => {
      it('should handle an undefined time', () => {
        expect(formatTimeMachineTime({} as any)).toBeUndefined()
      })

      it('should handle a UNIX timestamp', () => {
        const expected = format(2222222 * 1000, DARKSKY_DATE_FORMAT)
        const actual = formatTimeMachineTime({ time: 2222222 } as any)

        expect(actual).toEqual(expected)
      })

      it('should handle a date object', () => {
        const time = new Date()
        const expected = format(time, DARKSKY_DATE_FORMAT)
        const actual = formatTimeMachineTime({ time } as any)

        expect(actual).toEqual(expected)
      })

      it('should handle a date string', () => {
        const time = 'May 5 2019'
        const expected = format(time, DARKSKY_DATE_FORMAT)
        const actual = formatTimeMachineTime({ time } as any)

        expect(actual).toEqual(expected)
      })

      it('should handle invalid type', () => {
        expect(() => formatDateString({ time: 'imabaddate' } as any)).toThrow()
        expect(formatTimeMachineTime({ time: { foo: 42 } } as any)).toBeUndefined()
      })
    })
  })
})
