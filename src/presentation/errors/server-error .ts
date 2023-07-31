export class ServerError extends Error {
  constructor (stack: string | null) {
    super('Internal server error')
    this.name = 'ServerError'
    this.stack = stack
  }
}
