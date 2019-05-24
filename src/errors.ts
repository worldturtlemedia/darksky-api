export class HttpException extends Error {
  constructor(readonly code: number, readonly message: string, readonly data?: any) {
    super(message)
  }
}

export function badRequest(data?: any) {
  return new HttpException(400, 'Bad Request', data)
}

export function notFound(data?: any) {
  return new HttpException(404, 'Not Found', data)
}
