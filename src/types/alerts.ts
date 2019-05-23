/**
 * Objects representing the severe weather warnings issued for the requested location
 * by a governmental authority.
 *
 * @see https://darksky.net/dev/docs#response-alerts
 */
export interface Alert {
  /**
   * A detailed description of the alert.
   */
  description: string

  /**
   * The UNIX time at which the alert will expire.
   */
  expires: number

  /**
   * An array of strings representing the names of the regions covered by this weather alert.
   */
  regions: string[]

  /**
   * The severity of the weather alert.
   */
  severity: Severity

  /**
   * The UNIX time at which the alert was issued.
   */
  time: number

  /**
   * A brief description of the alert.
   */
  title: string

  /**
   * An HTTP(S) URI that one may refer to for detailed information about the alert.
   */
  url: string
}

/**
 * Severity of alert.
 *
 * "advisory" - an individual should be aware of potentially severe weather.
 * "watch" - an individual should prepare for potentially severe weather.
 * "warning" - an individual should take immediate action to protect themselves and others from potentially severe weather.
 */
export type Severity = 'advisory' | 'watch' | 'warning'
