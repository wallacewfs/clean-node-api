import { LoadAccountByToken, AddAccount, Authentication, AuthenticationParams } from '@/domain/usecases'
import { AccountModel, AuthenticationModel } from '@/domain/models'
import { mockAccountModel } from '@/tests/domain/mocks'
import { faker } from '@faker-js/faker'

export class AddAccountSpy implements AddAccount {
  isValid = true
  addAccountParams: AddAccount.Params

  async add (account: AddAccount.Params): Promise<AddAccount.Result> {
    this.addAccountParams = account
    return this.isValid
  }
}

export class AuthenticationSpy implements Authentication {
  authenticationParams: AuthenticationParams
  authenticationModel = {
    accessToken: faker.string.uuid(),
    name: faker.person.fullName()
  }

  async auth (authenticationParams: AuthenticationParams): Promise<AuthenticationModel> {
    this.authenticationParams = authenticationParams
    return this.authenticationModel
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accountModel = mockAccountModel()
  accessToken: string
  role: string

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    this.accessToken = accessToken
    this.role = role
    return Promise.resolve(this.accountModel)
  }
}
