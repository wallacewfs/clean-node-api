import { makeSignUpvalidation } from './signup-validation-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/account/add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { SingUpController } from '@/presentation/controllers/login/signup/signup-controller'
import { Controller } from '@/presentation/protocols'

export const makeSignUpControle = (): Controller => {
  const controller = new SingUpController(makeDbAddAccount(), makeSignUpvalidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
