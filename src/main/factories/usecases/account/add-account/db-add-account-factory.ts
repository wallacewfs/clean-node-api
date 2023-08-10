import { AddAccount } from '@/domain/usecases/account/add-account'
import { DbAddAccount } from '@/data/usecases/account/add-account/db-addccount'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { BcrypterAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcrypterAdapter = new BcrypterAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcrypterAdapter,accountMongoRepository, accountMongoRepository)
}
