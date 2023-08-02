import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return new Promise(resolve => resolve('any_token'))
  },

  async verify (): Promise<string> {
    return new Promise(resolve => resolve('any_value'))
  }

}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
  describe('sing()', () => {
    test('should call sign with correct values', async () => {
      const sut = makeSut()
      const singSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(singSpy).toHaveBeenLastCalledWith({ id: 'any_id' }, 'secret')
    })

    test('should return a tokenon sign success', async () => {
      const sut = makeSut()
      const accessToken = await sut.encrypt('any_id')
      expect(accessToken).toBe('any_token')
    })

    test('should throw if sign throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.encrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('verify()', () => {
    test('should call verify with correct values', async () => {
      const sut = makeSut()
      const verifySpy = jest.spyOn(jwt,'verify')
      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenLastCalledWith('any_token', 'secret')
    })
  })
})
