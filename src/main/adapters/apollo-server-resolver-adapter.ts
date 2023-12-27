import { Controller } from '@/presentation/protocols'
import { UserInputError, AuthenticationError, ForbiddenError, ApolloError } from 'apollo-server-express'

export const adaptResolver = async (controller: Controller, args: any): Promise<any> => {
  const httResponse = await controller.handle(args)
  switch (httResponse.statusCode) {
    case 200:
    case 204: return httResponse.body
    case 400: throw new UserInputError(httResponse.body.message)
    case 401: throw new AuthenticationError(httResponse.body.message)
    case 403: throw new ForbiddenError(httResponse.body.message)
    default: throw new ApolloError(httResponse.body.message)
  }
}
