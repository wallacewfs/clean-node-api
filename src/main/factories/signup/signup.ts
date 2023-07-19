import { SingUpController } from '../../../presentation/controllers/signup/signup'
import { DbAddAccount } from '../../../data/usecases/add-account/db-addccount'
import { BcrypterAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { LogControllerDecorator } from '../../decorators/log'
import { Controller } from '../../../presentation/protocols'
import { makeSignUpvalidation } from './signup-validation'

export const makeSignUpControle = (): Controller => {
  const salt = 12
  const bcrypterAdapter = new BcrypterAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcrypterAdapter,accountMongoRepository)
  const validationComposite = makeSignUpvalidation()
  const signUpControler = new SingUpController(dbAddAccount, validationComposite)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpControler, logMongoRepository)
}
