import { AccountModel } from '@/domain/models'
import { AddAccount, Authentication } from '@/domain/usecases'
import { faker } from '@faker-js/faker'

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => Object.assign({}, mockAddAccountParams() , { id: 'any_id' })

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
