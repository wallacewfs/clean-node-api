import { SingUpController } from './signup'
import { MissingParamError, InvalidParamError, ServerError } from '../errors'
import { EmailValidator } from '../protocols/email-validator'

interface SutTypes {
  sut: SingUpController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SingUpController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('SingUp Controller', () => {
  test('Should return 400 if no name is providde', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@amil.com',
        password: 'any_password',
        passworConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no email is providde', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passworConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is providde', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@amil.com',
        passworConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if no password confirmation is providde', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@amil.com',
        password: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Should return 400 if an invalid email is providde', () => {
    const { sut , emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@amil.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should call Emailvalidator with corret email', () => {
    const { sut , emailValidatorStub } = makeSut()
    const isValid = jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@amil.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    sut.handle(httpRequest)
    expect(isValid).toHaveBeenLastCalledWith('any_email@amil.com')
  })

  test('Should return 500 if emailvalidator throws', () => {
    class EmailValidatorStub implements EmailValidator {
      isValid (email: string): boolean {
        throw new Error()
      }
    }
    const emailValidatorStub = new EmailValidatorStub()
    const sut = new SingUpController(emailValidatorStub)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@amil.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
