import { SurveyModel } from '@/domain/models/survey'
import { AddSurvey } from '@/domain/usecases'
import { faker } from '@faker-js/faker'

export const mockSurveyModel = (): SurveyModel => {
  return {
    id: faker.string.uuid(),
    question: faker.word.sample(),
    answers: [{
      answer: faker.word.sample()
    }, {
      answer: faker.word.sample(),
      image: faker.image.url()
    }],
    date: faker.date.recent()
  }
}

export const mockSurveysModels = (): SurveyModel[] => {
  return [
    mockSurveyModel(),
    mockSurveyModel()
  ]
}

export const mockAddSurveyParams = (): AddSurvey.Params => ({
  question: faker.word.sample(),
  answers: [{
    image: faker.image.url(),
    answer: faker.word.sample()
  },{
    answer: faker.word.sample()
  }],
  date: faker.date.recent()
})
