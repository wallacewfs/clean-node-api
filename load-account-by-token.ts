
export interface LoadAccountByToken {
  load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result | null>
}

export namespace LoadAccountByToken {
  export type Result = {
    id: string
  }
}
