import { SingUpController } from './signup'
describe('SingUp Controller', () => {
  test('Should return 400 if no name is providde', () => {
    const sut = new SingUpController()
    const httpRequest = {
      body: {
        email: 'any_email@amil.com',
        password: 'any_password',
        passworConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
