import { AccountModel } from '@/domain/models'
import { AddAccountParams, AuthenticationParams } from '@/domain/usecases'
import { faker } from '@faker-js/faker'

export const mockAddAccountParams = (): AddAccountParams => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => Object.assign({}, mockAddAccountParams() , { id: 'any_id' })

export const mockAuthenticationParams = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
