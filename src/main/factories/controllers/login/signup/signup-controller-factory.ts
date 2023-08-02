import { SingUpController } from '../../../../../presentation/controllers/login/signup/signup-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeSignUpvalidation } from './signup-validation-factory'
import { makeDbAuthentication } from '../../../usecases/account/authentication/db-authentication-factory'
import { makeDbAddAccount } from '../../../usecases/account/add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeSignUpControle = (): Controller => {
  const controller = new SingUpController(makeDbAddAccount(), makeSignUpvalidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
