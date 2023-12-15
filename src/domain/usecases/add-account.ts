
export interface AddAccount {
  add (account: AddAccount.Params): Promise<AddAccount.Result | null>
}

export namespace AddAccount {
  export type Params = {
    name: string
    email: string
    password: string
  }

  export type Result = boolean
}
