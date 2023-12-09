import { MongoHelper, LogMongoRepository } from '@/infra/db'
import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

describe('LogMongoRepository', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getColletion('errors')
    await errorCollection.deleteMany({})
  }
  )

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError(faker.word.words())
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
