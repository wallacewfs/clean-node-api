import { SingUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-addccount'
import { BcrypterAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogControllerDecorator } from '../decorators/log'
import { Controller } from '../../presentation/protocols'

export const makeSignUpControle = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcrypterAdapter = new BcrypterAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcrypterAdapter,accountMongoRepository)
  const signUpControler = new SingUpController(emailValidatorAdapter, dbAddAccount)
  return new LogControllerDecorator(signUpControler)
}
