import { SurveyMongoRepository, SurveyResultMongoRepository, MongoHelper } from '@/infra/db'
import { SurveyModel } from '@/domain/models'
import { Collection, ObjectId } from 'mongodb'
import { mockAddSurveyParams, mockAddAccountParams } from '@/tests/domain/mocks'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const mockAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())
  return res.insertedId.toHexString()
}

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const makeSurveyRepository = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

const makeSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne(mockAddSurveyParams())
  const surveyMongoRepository = makeSurveyRepository()
  const survey = await surveyMongoRepository.loadById(res.insertedId.toHexString())
  return survey
}

describe('SurveyMongoRepository', () => {
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
  })

  describe('Save()', () => {
    test('Should add a survey result if its new', async () => {
      const survey = await makeSurvey()
      const accountId = await mockAccountId()
      const sut = makeSut()

      await sut.save({
        surveyId: survey.id,
        accountId,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const surveyResult = await surveyResultCollection.findOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(accountId)
      })
      expect(surveyResult).toBeTruthy()
    })

    test('Should update a survey result if its new', async () => {
      const survey = await makeSurvey()
      const accountId = await mockAccountId()
      const oSurveyId = new ObjectId(survey.id)
      const oaccountId = new ObjectId(accountId)
      await surveyCollection.insertOne({
        surveyId: oSurveyId,
        accountId: oaccountId,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const sut = makeSut()
      await sut.save({
        surveyId: survey.id,
        accountId,
        answer: survey.answers[1].answer,
        date: new Date()
      })
      const surveyResult = await surveyCollection
        .find({
          surveyId: oSurveyId,
          accountId: oaccountId
        }).toArray()
      expect(surveyResult).toBeTruthy()
    })
  })

  describe('loadBySurveyId()', () => {
    test('Should load a survey result ', async () => {
      const survey = await makeSurvey()
      const accountId = await mockAccountId()
      const accountId2 = await mockAccountId()
      const oSurveyId = new ObjectId(survey.id)
      const oaccountId = new ObjectId(accountId)
      const oaccountId2 = new ObjectId(accountId2)
      await surveyResultCollection.insertMany([{
        surveyId: oSurveyId,
        accountId: oaccountId,
        answer: survey.answers[0].answer,
        date: new Date()
      }, {
        surveyId: oSurveyId,
        accountId: oaccountId2,
        answer: survey.answers[0].answer,
        date: new Date()
      }])
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, accountId)
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId.toString()).toEqual(survey.id.toString())
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(100)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(true)
      expect(surveyResult.answers[1].count).toBe(0)
      expect(surveyResult.answers[1].percent).toBe(0)
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false)
    })

    test('Should load a survey result2 ', async () => {
      const survey = await makeSurvey()
      const accountId = await mockAccountId()
      const accountId2 = await mockAccountId()
      const accountId3 = await mockAccountId()
      const oSurveyId = new ObjectId(survey.id)
      const oaccountId = new ObjectId(accountId)
      const oaccountId2 = new ObjectId(accountId2)
      const oaccountId3 = new ObjectId(accountId3)
      await surveyResultCollection.insertMany([{
        surveyId: oSurveyId,
        accountId: oaccountId,
        answer: survey.answers[0].answer,
        date: new Date()
      }, {
        surveyId: oSurveyId,
        accountId: oaccountId2,
        answer: survey.answers[1].answer,
        date: new Date()
      }, {
        surveyId: oSurveyId,
        accountId: oaccountId3,
        answer: survey.answers[1].answer,
        date: new Date()
      }])
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, accountId2)
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId.toString()).toEqual(survey.id.toString())
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(67)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(true)
      expect(surveyResult.answers[1].count).toBe(1)
      expect(surveyResult.answers[1].percent).toBe(33)
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false)
    })

    test('Should load a survey result3 ', async () => {
      const survey = await makeSurvey()
      const accountId = await mockAccountId()
      const accountId2 = await mockAccountId()
      const accountId3 = await mockAccountId()
      const oSurveyId = new ObjectId(survey.id)
      const oaccountId = new ObjectId(accountId)
      const oaccountId2 = new ObjectId(accountId2)
      await surveyResultCollection.insertMany([{
        surveyId: oSurveyId,
        accountId: oaccountId,
        answer: survey.answers[0].answer,
        date: new Date()
      }, {
        surveyId: oSurveyId,
        accountId: oaccountId2,
        answer: survey.answers[1].answer,
        date: new Date()
      }])
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, accountId3)
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId.toString()).toEqual(survey.id.toString())
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(50)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(false)
      expect(surveyResult.answers[1].count).toBe(1)
      expect(surveyResult.answers[1].percent).toBe(50)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(false)
    })

    test('Should return null if there is no surveyResult ', async () => {
      const survey = await makeSurvey()
      const accountId = await mockAccountId()
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, accountId)
      expect(surveyResult).toBeNull()
    })
  })
})
