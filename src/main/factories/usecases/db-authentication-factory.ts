import env from '@/main/config/env'
import { Authentication } from '@/domain/usecases'
import { AccountMongoRepository } from '@/infra/db'
import { BcrypterAdapter, JwtAdapter } from '@/infra/criptography'
import { DbAuthentication } from '@/data/usecases'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcrypt = new BcrypterAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(accountMongoRepository, bcrypt, jwtAdapter, accountMongoRepository)
}
