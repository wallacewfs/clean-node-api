
export interface LoadAccountByEmailRepository {
  loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result | null>
}

export namespace LoadAccountByEmailRepository {
  export type Result = {
    id: string
    name: string
    password: string
  }
}
