import { SaveSurveyResult } from '@/domain/usecases'
import { faker } from '@faker-js/faker'

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  surveyId: faker.string.uuid(),
  accountId: faker.string.uuid(),
  answer: faker.word.words(),
  date: faker.date.recent()
})

export const mockSurveyResultModel = (): SaveSurveyResult.Result => ({
  surveyId: faker.string.uuid(),
  question: faker.word.words(),
  answers: [{
    answer: faker.word.words(),
    count: faker.number.float({ min: 0, max: 1000 }),
    percent: faker.number.float({ min: 0, max: 100 }),
    isCurrentAccountAnswer: faker.datatype.boolean(0.9)
  }, {
    answer: faker.word.words(),
    image: faker.image.url(),
    count: faker.number.float({ min: 0, max: 1000 }),
    percent: faker.number.float({ min: 0, max: 100 }),
    isCurrentAccountAnswer: faker.datatype.boolean()
  }],
  date: faker.date.recent()
})
