let mockError: any
let mockResponse: any = {}

const axiosMock: any = jest.genMockFromModule('axios')

function req() {
  return new Promise(function(resolve, reject) {
    if (mockError) {
      reject(mockError)
    } else {
      resolve(mockResponse)
    }
  })
}

axiosMock.reset = () => {
  mockError = null
  axiosMock.get.mockClear()
  mockResponse = {
    data: {},
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {}
  }
}

axiosMock.get.mockImplementation(req)

axiosMock._setMockError = (err: any) => {
  mockError = err
}

axiosMock._setMockResponse = (response: any) => {
  mockResponse = { ...mockResponse, ...response }
}

export interface AxiosMock {
  reset: () => void
  get: jest.Mock
  _setMockError: (err: any) => void
  _setMockResponse: (response: any) => void
}

export default axiosMock
