import bcrypt from 'bcrypt'
import { BcrypterAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => (resolve('hash')))
  }
}))

const salt = 12
const makesut = (): BcrypterAdapter => {
  const sut = new BcrypterAdapter(salt)
  return sut
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = makesut()
    const hashSpy = jest.spyOn(bcrypt,'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash on sucess', async () => {
    const sut = makesut()
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hash')
  })

  test('Should throw if bcrypt throw', async () => {
    const sut = makesut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => {
      return new Promise((resolve,reject) => reject(new Error()))
    })
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })
})
