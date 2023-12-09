import { makeLogControllerDecorator, makeDbAddAccount, makeDbAuthentication, makeSignUpvalidation } from '@/main/factories'
import { SingUpController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeSignUpControle = (): Controller => {
  const controller = new SingUpController(makeDbAddAccount(), makeSignUpvalidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
