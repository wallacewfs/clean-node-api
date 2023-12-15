import { AccountModel } from '@/domain/models/account'

export interface LoadAccountByTokenRepository {
  loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepository.Result | null>
}

export namespace LoadAccountByTokenRepository {
  export type Result = AccountModel
}
