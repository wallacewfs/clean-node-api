export interface AuthenticationModel {
  email: string
  password: string
}

export interface Authentication {
  auth (authenticatio: AuthenticationModel): Promise<string>
}
