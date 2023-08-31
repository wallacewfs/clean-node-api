import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { faker } from '@faker-js/faker'

export const mockSurveyModel = (): SurveyModel => {
  return {
    id: faker.string.uuid(),
    question: faker.word.words(),
    answers: [{
      answer: faker.word.words()
    }, {
      answer: faker.word.words(),
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

export const mockAddSurveyParams = (): AddSurveyParams => ({
  question: faker.word.words(),
  answers: [{
    image: faker.image.url(),
    answer: faker.word.words()
  },{
    answer: faker.word.words()
  }],
  date: faker.date.recent()
})
