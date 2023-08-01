export class AccesDeniedError extends Error {
  constructor () {
    super('Access denied')
    this.name = 'AccesDeniedError'
  }
}
