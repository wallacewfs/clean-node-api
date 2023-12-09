import { AddAccount } from '@/domain/usecases'
import { DbAddAccount } from '@/data/usecases'
import { AccountMongoRepository } from '@/infra/db'
import { BcrypterAdapter } from '@/infra/criptography'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcrypterAdapter = new BcrypterAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcrypterAdapter,accountMongoRepository, accountMongoRepository)
}
