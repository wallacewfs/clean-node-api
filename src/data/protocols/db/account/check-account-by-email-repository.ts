
export interface CheckAccountByEmailRepository {
  checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result | null>
}

export namespace CheckAccountByEmailRepository {
  export type Result = boolean
}
