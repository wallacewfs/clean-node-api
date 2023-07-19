import bcrypt from 'bcrypt'
import { BcrypterAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => (resolve('hash')))
  },

  async compare (): Promise<boolean> {
    return new Promise(resolve => resolve(true))
  }
}))

const salt = 12
const makesut = (): BcrypterAdapter => {
  const sut = new BcrypterAdapter(salt)
  return sut
}

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct values', async () => {
    const sut = makesut()
    const hashSpy = jest.spyOn(bcrypt,'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a valide hash on hash sucess', async () => {
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

  test('Should call compare with correct values', async () => {
    const sut = makesut()
    const compareSpy = jest.spyOn(bcrypt,'compare')
    await sut.compare('any_value', 'any_hash')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })

  test('Should return true whe compare succeeds', async () => {
    const sut = makesut()
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBeTruthy()
  })
})
