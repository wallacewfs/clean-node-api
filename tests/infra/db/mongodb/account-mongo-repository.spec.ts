import { Collection } from 'mongodb'
import { MongoHelper , AccountMongoRepository } from '@/infra/db'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { faker } from '@faker-js/faker'

let accountCollection: Collection

describe('AAccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getColletion('accounts')
    await accountCollection.deleteMany({})
  }
  )

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  describe('add()', () => {
    test('Should return an account on sucess', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      await accountCollection.insertOne(addAccountParams)
      const account = await sut.loadByEmail(addAccountParams.email)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(addAccountParams.name)
      expect(account.email).toBe(addAccountParams.email)
      expect(account.password).toBe(addAccountParams.password)
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      await accountCollection.insertOne(addAccountParams)
      const account = await sut.loadByEmail(addAccountParams.email)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(addAccountParams.name)
      expect(account.email).toBe(addAccountParams.email)
      expect(account.password).toBe(addAccountParams.password)
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail(faker.internet.email())
      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on success', async () => {
      const sut = makeSut()
      const result = await accountCollection.insertOne(mockAddAccountParams())
      const fakeAccount = await accountCollection.findOne({ _id: result.insertedId })
      expect(fakeAccount?.accessToken).toBeFalsy()
      const accessToken = faker.string.uuid()
      await sut.updateAccessToken(result.insertedId.toString(), accessToken)
      const account = await accountCollection.findOne({ _id: result.insertedId })
      expect(account).toBeTruthy()
      expect(account?.accessToken).toBe(accessToken)
    })
  })

  describe('loadBytoken()', () => {
    let name = faker.person.fullName()
    let email = faker.internet.email()
    let password = faker.internet.password()
    let accessToken = faker.string.uuid()

    beforeEach(() => {
      name = faker.person.fullName()
      email = faker.internet.email()
      password = faker.internet.password()
      accessToken = faker.string.uuid()
    })

    test('Should return an account on loadBytoken without role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken
      })
      const account = await sut.loadByToken(accessToken)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(name)
      expect(account.email).toBe(email)
      expect(account.password).toBe(password)
    })

    test('Should return an account on loadBytoken with admin role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken,
        role: 'admin'
      })
      const account = await sut.loadByToken(accessToken, 'admin')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(name)
      expect(account.email).toBe(email)
      expect(account.password).toBe(password)
    })

    test('Should return null on loadBytoken with invalid role', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken
      })
      const account = await sut.loadByToken(accessToken, 'admin')
      expect(account).toBeFalsy()
    })

    test('Should return an account on loadBytoken if user is admin', async () => {
      const sut = makeSut()
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken,
        role: 'admin'
      })
      const account = await sut.loadByToken(accessToken)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(name)
      expect(account.email).toBe(email)
      expect(account.password).toBe(password)
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken(accessToken)
      expect(account).toBeFalsy()
    })
  })
})
