import { Hasher, AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols'
import { AddAccount } from '@/domain/usecases'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly checkdAccountByEmailRepository: CheckAccountByEmailRepository) {}

  async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const exists = await this.checkdAccountByEmailRepository.checkByEmail(accountData.email)
    let isValid = false
    if (!exists) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      isValid = await this.addAccountRepository.add({ ...accountData, password: hashedPassword })
    }
    return isValid
  }
}
