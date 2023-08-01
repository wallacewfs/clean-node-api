import { AccesDeniedError } from '../errors/access-denied-error'
import { forbidden } from '../helpers/http/http-helpers'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = forbidden(new AccesDeniedError())
    return new Promise(resolve => resolve(error))
  }
}
