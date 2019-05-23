/**
 * Object that contains various metadata information related to the request.
 *
 * @see https://darksky.net/dev/docs#response-flags
 */
export interface Flags {
  /**
   * Indicates the units which were used for the data in this request.
   */
  units: string

  /**
   * An array of IDs for each data source utilized in servicing this request.
   */
  sources: string[]

  /**
   * The distance to the nearest weather station that contributed data to this response.
   *
   * Note, however, that many other stations may have also been used; this value is primarily
   * for debugging purposes. This property's value is in miles (if US units are selected) or
   * kilometers (if SI units are selected).
   */
  'nearest-station'?: number
}
