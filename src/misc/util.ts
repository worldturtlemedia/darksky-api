import format from 'date-fns/format'
import isDate from 'date-fns/is_date'
import isValid from 'date-fns/is_valid'

import { NumberString, TimeMachineRequest } from '../types'
import { badRequest } from './errors'

/**
 * Date format string for formatting a Date into a string that DarkSky expects.
 */
export const DARKSKY_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ssZZ'

/**
 * Takes a string or a Date and formats it to what DarkSky's API is expecting.
 *
 * @param date Date string or object to format using [[DARKSKY_DATE_FORMAT]].
 */
export function formatDateString(date: string | number | Date): string {
  const target = isDate(date) ? (date as Date) : new Date(date)
  if (!isValid(target)) {
    throw badRequest(`'${target}' is not a valid Date object.`)
  }

  return format(target, DARKSKY_DATE_FORMAT)
}

/**
 * Takes the `time` from the TimeMachineRequest and converts it into a string | number that is
 * valid for the API.
 *
 * @private
 * @param time Time string, millis, or Date object.
 * @returns undefined if time is undefined, a number if its a number, or a formatted date string.
 */
export function formatTimeMachineTime({ time }: TimeMachineRequest) {
  if (!time) return undefined
  else if (Number.isInteger(time as number)) return formatDateString((time as number) * 1000)
  else if (isString(time) || isDate(time)) return formatDateString(time as string | Date)
}

/**
 * Checks if the given value is a string.
 *
 * @param value Value to check if is a `string`.
 */
export function isString(value: any): boolean {
  return typeof value === 'string' || value instanceof String
}

/**
 * Check if value is a number, or if a string can be parsed into a number.
 *
 * @param value Value to check.
 * @returns `true` if it is a valid number.
 */
export function isNumber(value: NumberString): boolean {
  if (Number.isInteger(value as number)) return true

  return isString(value) && Number.isInteger(parseInt(value as string, 10))
}
