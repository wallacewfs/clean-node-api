import { HttpResponse, Middleware } from '@/presentation/protocols'
import { LoadAccountByToken } from '@/domain/usecases'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { AccesDeniedError } from '@/presentation/errors'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountbyToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = request
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

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
