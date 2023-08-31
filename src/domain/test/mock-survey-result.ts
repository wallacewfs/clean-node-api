import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { faker } from '@faker-js/faker'

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  surveyId: faker.string.uuid(),
  accountId: faker.string.uuid(),
  answer: faker.word.words(),
  date: faker.date.recent()
})

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: faker.string.uuid(),
  question: faker.word.words(),
  answers: [{
    answer: faker.word.words(),
    count: faker.number.float({ min: 0, max: 1000 }),
    percent: faker.number.float({ min: 0, max: 100 })
  }, {
    answer: faker.word.words(),
    image: faker.image.url(),
    count: faker.number.float({ min: 0, max: 1000 }),
    percent: faker.number.float({ min: 0, max: 100 })
  }],
  date: faker.date.recent()
})
