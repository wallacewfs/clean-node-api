import { SurveyMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddAccountParams, mockAddSurveyParams } from '@/tests/domain/mocks'
import { Collection, ObjectId } from 'mongodb'
import FakeObjectId from 'bson-objectid'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const mockAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())
  const account = await accountCollection.findOne({ _id: res.insertedId })
  return account._id.toHexString()
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
      const accountId = await mockAccountId()
      const addSurveyModels = [mockAddSurveyParams(), mockAddSurveyParams()]
      const result = await surveyCollection.insertMany(addSurveyModels)
      const surveyIdSinserted = result.insertedIds[0]
      const survey = await surveyCollection.findOne(surveyIdSinserted)
      await surveyResultCollection.insertOne({
        surveyId: survey._id,
        accountId: new ObjectId(accountId),
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const sut = makeSut()
      const surveys = await sut.loadAll(accountId)
      expect(surveys.length).toBe(2)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe(addSurveyModels[0].question)
      expect(surveys[0].didAnswer).toBe(true)
      expect(surveys[1].question).toBe(addSurveyModels[1].question)
      expect(surveys[1].didAnswer).toBe(false)
    })

    test('Should load empty list', async () => {
      const sut = makeSut()
      const accountId = await mockAccountId()
      const surveys = await sut.loadAll(accountId)
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

    test('Should return null if if survey does not exists', async () => {
      const sut = makeSut()
      const survey = await sut.loadById(FakeObjectId().toHexString())
      expect(survey).toBeFalsy()
    })
  })

  describe('loadAnswers())', () => {
    test('Should load anwers on sucess', async () => {
      const resultInsert = await surveyCollection.insertOne(mockAddSurveyParams())
      const survey = await surveyCollection.findOne({ _id: resultInsert.insertedId })
      const sut = makeSut()
      const answers = await sut.loadAnswers(resultInsert.insertedId.toHexString())
      expect(answers).toEqual([survey.answers[0].answer, survey.answers[1].answer])
    })

    test('Should return empty array if survey does not exists', async () => {
      const sut = makeSut()
      const answers = await sut.loadAnswers(FakeObjectId().toHexString())
      expect(answers).toEqual([])
    })
  })

  describe('checkById())', () => {
    test('Should return true if survey exists', async () => {
      const resultInsert = await surveyCollection.insertOne(mockAddSurveyParams())
      const sut = makeSut()
      const exists = await sut.checkById(resultInsert.insertedId.toHexString())
      expect(exists).toBe(true)
    })

    test('Should false if survey not exists', async () => {
      const sut = makeSut()
      const exists = await sut.checkById(FakeObjectId().toHexString())
      expect(exists).toBe(false)
    })
  })
})
