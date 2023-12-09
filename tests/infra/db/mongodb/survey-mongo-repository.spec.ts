import { SurveyMongoRepository, MongoHelper } from '@/infra/db'
import { AccountModel } from '@/domain/models'
import { mockAddAccountParams, mockAddSurveyParams } from '@/tests/domain/mocks'
import { Collection } from 'mongodb'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const mockAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())
  const account = await accountCollection.findOne({ _id: res.insertedId })
  return MongoHelper.map(account)
}

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

describe('SurveyMongoRepositoryy', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getColletion('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getColletion('surveyResults')
    await surveyResultCollection.deleteMany({})
    accountCollection = await MongoHelper.getColletion('account')
    await accountCollection.deleteMany({})
  }
  )

  describe('add()', () => {
    test('Should add a survey on sucess', async () => {
      const sut = makeSut()
      await sut.add(mockAddSurveyParams())
      const count = await surveyCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('loadAll()', () => {
    test('Should load all surveys on sucess', async () => {
      const account = await mockAccount()
      const addSurveyModels = [mockAddSurveyParams(), mockAddSurveyParams()]
      const result = await surveyCollection.insertMany(addSurveyModels)
      const surveyIdSinserted = result.insertedIds[0]
      const survey = await surveyCollection.findOne(surveyIdSinserted)
      await surveyResultCollection.insertOne({
        surveyId: survey._id,
        accountId: (await account).id,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const sut = makeSut()
      const surveys = await sut.loadAll(account.id)
      expect(surveys.length).toBe(2)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe(addSurveyModels[0].question)
      expect(surveys[0].didAnswer).toBe(true)
      expect(surveys[1].question).toBe(addSurveyModels[1].question)
      expect(surveys[1].didAnswer).toBe(false)
    })

    test('Should load empty list', async () => {
      const sut = makeSut()
      const account = await mockAccount()
      const surveys = await sut.loadAll(account.id)
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById())', () => {
    test('Should load survey by id on sucess', async () => {
      const resultInsert = await surveyCollection.insertOne(mockAddSurveyParams())
      const sut = makeSut()
      const survey = await sut.loadById(resultInsert.insertedId.toHexString())
      expect(survey).toBeTruthy()
      expect(survey.id).toBeTruthy()
    })
  })
})
