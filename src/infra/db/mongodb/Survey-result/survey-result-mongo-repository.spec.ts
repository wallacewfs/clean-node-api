import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { Collection, ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helpers'
import { SurveyModel } from '@/domain/models/survey'
import { SurveyMongoRepository } from '../survey/survey-mongo-repository'
import { AccountModel } from '@/domain/models/account'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const makeSurveyRepository = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

const makeSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer_1'
    }, {
      answer: 'any_answer_2'
    }, {
      answer: 'any_answer_3'
    }],
    date: new Date()
  })
  const surveyMongoRepository = makeSurveyRepository()
  const survey = await surveyMongoRepository.loadById(res.insertedId.toHexString())
  return survey
}

const makeAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    passwaord: '123',
    passwaordConfirmation: '123'
  })
  const account = await accountCollection.findOne({ _id: res.insertedId })
  return MongoHelper.map(account)
}

describe('Save Mogo Repository', () => {
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

  describe('Save()', () => {
    test('Should add a survey result if its new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const sut = makeSut()

      await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const oSurveyId = new ObjectId(survey.id)
      const oaccountId = new ObjectId(account.id)
      const surveyResult = await surveyResultCollection.findOne({
        surveyId: oSurveyId,
        accountId: oaccountId
      })
      expect(surveyResult).toBeTruthy()
    })

    test('Should update a survey result if its new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const oSurveyId = new ObjectId(survey.id)
      const oaccountId = new ObjectId(account.id)
      await surveyCollection.insertOne({
        surveyId: oSurveyId,
        accountId: oaccountId,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const sut = makeSut()
      await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[1].answer,
        date: new Date()
      })
      const surveyResult = await surveyCollection
        .find({
          surveyId: oSurveyId,
          accountId: oaccountId
        }).toArray()
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.length).toBe(1)
    })
  })

  describe('loadBySurveyId()', () => {
    test('Should load a survey result ', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const oSurveyId = new ObjectId(survey.id)
      const oaccountId = new ObjectId(account.id)
      await surveyResultCollection.insertMany([{
        surveyId: oSurveyId,
        accountId: oaccountId,
        answer: survey.answers[0].answer,
        date: new Date()
      }, {
        surveyId: oSurveyId,
        accountId: oaccountId,
        answer: survey.answers[0].answer,
        date: new Date()
      }, {
        surveyId: oSurveyId,
        accountId: oaccountId,
        answer: survey.answers[1].answer,
        date: new Date()
      }, {
        surveyId: oSurveyId,
        accountId: oaccountId,
        answer: survey.answers[1].answer,
        date: new Date()
      }])
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id)
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId.toString()).toEqual(survey.id)
      expect(surveyResult.answers[0].answer).toBe(survey.answers[1].answer)
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(50)
      expect(surveyResult.answers[1].count).toBe(2)
      expect(surveyResult.answers[1].percent).toBe(50)
      expect(surveyResult.answers[2].count).toBe(0)
      expect(surveyResult.answers[2].percent).toBe(0)
    })
  })
})
