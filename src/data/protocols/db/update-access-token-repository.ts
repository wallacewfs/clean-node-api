export interface UpdateAccessTokenRepository {
  update (id: string, tkoen: string): Promise<void>
}
