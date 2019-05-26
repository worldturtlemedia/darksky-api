import { DarkSky } from '../src'

describe('Lib', () => {
  it('should export the DarkSky wrapper', () => {
    const wrapper = new DarkSky('foo')
    expect(wrapper).toBeInstanceOf(DarkSky)
    expect(wrapper.day).toBeInstanceOf(Function)
  })
})
