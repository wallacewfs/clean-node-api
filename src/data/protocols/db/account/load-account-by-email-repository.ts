import { AccountModel } from '../../../../domain/models/account'

export interface LoadAccountByEmailRepository {
  loadbyEmail (email: string): Promise<AccountModel | null>
}
