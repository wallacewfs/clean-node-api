import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { Collection } from 'mongodb'
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
      answer: 'any_answer'
    }, {
      answer: 'other_answer'
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
      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId.toString()).toEqual(survey.id.toString())
      expect(surveyResult.answers[0].answer).toBe(survey.answers[0].answer)
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(100)
    })
  })

  test('Should update a survey result if its new', async () => {
    const survey = await makeSurvey()
    const account = await makeAccount()
    const sut = makeSut()
    const surveyResult = await sut.save({
      surveyId: survey.id,
      accountId: account.id,
      answer: survey.answers[1].answer,
      date: new Date()
    })
    expect(surveyResult).toBeTruthy()
    expect(surveyResult.surveyId.toString()).toEqual(survey.id)
    expect(surveyResult.answers[0].answer).toBe(survey.answers[1].answer)
    expect(surveyResult.answers[0].count).toBe(1)
    expect(surveyResult.answers[0].percent).toBe(100)
  })
})
