import { HttpRequest, HttpResponse, Middleware, LoadAccountByToken } from './auth-middleware-protocols'
import { forbidden, ok, serverError } from '../helpers/http/http-helpers'
import { AccesDeniedError } from '../errors/access-denied-error'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountbyToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountbyToken.load(accessToken, this.role)
        if (account) {
          return ok({ accountId: account.id })
        }
      }
      return forbidden(new AccesDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
