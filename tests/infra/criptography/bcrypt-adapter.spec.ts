import bcrypt from 'bcrypt'
import { BcrypterAdapter } from '@/infra/criptography'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return Promise.resolve('hash')
  },

  async compare (): Promise<boolean> {
    return Promise.resolve(true)
  }
}))

const salt = 12
const makesut = (): BcrypterAdapter => {
  const sut = new BcrypterAdapter(salt)
  return sut
}

describe('Bcrypt Adapter', () => {
  describe('hash(', () => {
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

    test('Should throw if hash throw', async () => {
      const sut = makesut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => {
        return Promise.reject(new Error())
      })
      const promise = sut.hash('any_value')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('compare()', () => {
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

    test('Should return false when compare fails', async () => {
      const sut = makesut()
      jest.spyOn(bcrypt,'compare').mockImplementationOnce(() => false)
      const isValid = await sut.compare('any_value', 'any_hash')
      expect(isValid).toBeFalsy()
    })

    test('Should throw if comapre throw', async () => {
      const sut = makesut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => {
        return Promise.reject(new Error())
      })
      const promise = sut.hash('any_value')
      await expect(promise).rejects.toThrow()
    })
  })
})
